import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertContactSchema, insertUserSchema, insertMindNodeSchema, insertNodeRelationshipSchema,
  NodeType, NodeStatus
} from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Authentication token is required" 
    });
  }
  
  try {
    // Secret should be in environment variable in production
    const JWT_SECRET = process.env.JWT_SECRET || 'overmind-jwt-secret';
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId; // Add userId to request body
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: "Invalid or expired token" 
    });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      // Add email validation to user schema
      const registerSchema = insertUserSchema.extend({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
      });
      
      const validatedData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "Username already exists" 
        });
      }
      
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ 
          success: false, 
          message: "Email already in use" 
        });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });
      
      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET || 'overmind-jwt-secret';
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      
      // Return user info without password and token
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while registering user"
        });
      }
    }
  });
  
  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginSchema = z.object({
        username: z.string(),
        password: z.string(),
      });
      
      const validatedData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByUsername(validatedData.username);
      if (!user) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(validatedData.password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Generate JWT token
      const JWT_SECRET = process.env.JWT_SECRET || 'overmind-jwt-secret';
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
      
      // Return user info without password and token
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error logging in:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while logging in"
        });
      }
    }
  });
  
  // Mind nodes routes
  app.get("/api/mind-nodes", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const nodes = await storage.getMindNodesByUserId(userId);
      res.status(200).json({
        success: true,
        data: nodes
      });
    } catch (error) {
      console.error("Error getting mind nodes:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while getting mind nodes"
      });
    }
  });
  
  app.get("/api/mind-nodes/:id", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const nodeId = parseInt(req.params.id);
      const node = await storage.getMindNode(nodeId);
      
      if (!node) {
        return res.status(404).json({ 
          success: false, 
          message: "Mind node not found" 
        });
      }
      
      // Check if node belongs to the authenticated user
      if (node.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "Unauthorized access to mind node" 
        });
      }
      
      res.status(200).json({
        success: true,
        data: node
      });
    } catch (error) {
      console.error("Error getting mind node:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while getting mind node"
      });
    }
  });
  
  app.post("/api/mind-nodes", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      
      // Add validation for the mind node
      const nodeSchema = insertMindNodeSchema.extend({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
        type: z.enum([
          NodeType.TASK, NodeType.IDEA, NodeType.NOTE, 
          NodeType.PROJECT, NodeType.GOAL
        ]),
        status: z.enum([
          NodeStatus.ACTIVE, NodeStatus.IN_PROGRESS, 
          NodeStatus.DONE, NodeStatus.ARCHIVED
        ]),
        priority: z.number().min(1).max(5),
        tags: z.array(z.string()).optional(),
      });
      
      const validatedData = nodeSchema.parse({
        ...req.body,
        user_id: userId // Ensure the node is assigned to the authenticated user
      });
      
      const node = await storage.createMindNode(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Mind node created successfully",
        data: node
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating mind node:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while creating mind node"
        });
      }
    }
  });
  
  app.put("/api/mind-nodes/:id", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const nodeId = parseInt(req.params.id);
      
      // Check if node exists and belongs to the user
      const existingNode = await storage.getMindNode(nodeId);
      if (!existingNode) {
        return res.status(404).json({ 
          success: false, 
          message: "Mind node not found" 
        });
      }
      
      if (existingNode.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "Unauthorized access to mind node" 
        });
      }
      
      // Validate update data
      const updateSchema = z.object({
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        type: z.enum([
          NodeType.TASK, NodeType.IDEA, NodeType.NOTE, 
          NodeType.PROJECT, NodeType.GOAL
        ]).optional(),
        status: z.enum([
          NodeStatus.ACTIVE, NodeStatus.IN_PROGRESS, 
          NodeStatus.DONE, NodeStatus.ARCHIVED
        ]).optional(),
        priority: z.number().min(1).max(5).optional(),
        tags: z.array(z.string()).optional(),
        ai_notes: z.string().optional(),
        position_x: z.number().optional(),
        position_y: z.number().optional(),
      });
      
      const validatedData = updateSchema.parse(req.body);
      
      // Update the node
      const updatedNode = await storage.updateMindNode(nodeId, validatedData);
      
      res.status(200).json({
        success: true,
        message: "Mind node updated successfully",
        data: updatedNode
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error updating mind node:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while updating mind node"
        });
      }
    }
  });
  
  app.delete("/api/mind-nodes/:id", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const nodeId = parseInt(req.params.id);
      
      // Check if node exists and belongs to the user
      const existingNode = await storage.getMindNode(nodeId);
      if (!existingNode) {
        return res.status(404).json({ 
          success: false, 
          message: "Mind node not found" 
        });
      }
      
      if (existingNode.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "Unauthorized access to mind node" 
        });
      }
      
      // Delete the node and its relationships
      await storage.deleteMindNode(nodeId);
      
      res.status(200).json({
        success: true,
        message: "Mind node deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting mind node:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting mind node"
      });
    }
  });
  
  // Search mind nodes
  app.get("/api/mind-nodes/search/:query", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const query = req.params.query;
      
      const nodes = await storage.searchMindNodes(userId, query);
      
      res.status(200).json({
        success: true,
        data: nodes
      });
    } catch (error) {
      console.error("Error searching mind nodes:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while searching mind nodes"
      });
    }
  });
  
  // Filter mind nodes by tag
  app.get("/api/mind-nodes/tag/:tag", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const tag = req.params.tag;
      
      const nodes = await storage.getMindNodesByTag(userId, tag);
      
      res.status(200).json({
        success: true,
        data: nodes
      });
    } catch (error) {
      console.error("Error filtering mind nodes by tag:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while filtering mind nodes by tag"
      });
    }
  });
  
  // Filter mind nodes by type
  app.get("/api/mind-nodes/type/:type", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const type = req.params.type as NodeType;
      
      // Validate node type
      if (!Object.values(NodeType).includes(type)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid node type" 
        });
      }
      
      const nodes = await storage.getMindNodesByType(userId, type);
      
      res.status(200).json({
        success: true,
        data: nodes
      });
    } catch (error) {
      console.error("Error filtering mind nodes by type:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while filtering mind nodes by type"
      });
    }
  });
  
  // Filter mind nodes by status
  app.get("/api/mind-nodes/status/:status", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const status = req.params.status as NodeStatus;
      
      // Validate node status
      if (!Object.values(NodeStatus).includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid node status" 
        });
      }
      
      const nodes = await storage.getMindNodesByStatus(userId, status);
      
      res.status(200).json({
        success: true,
        data: nodes
      });
    } catch (error) {
      console.error("Error filtering mind nodes by status:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while filtering mind nodes by status"
      });
    }
  });
  
  // Node relationships routes
  app.get("/api/node-relationships/:nodeId", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const nodeId = parseInt(req.params.nodeId);
      
      // Check if node exists and belongs to the user
      const existingNode = await storage.getMindNode(nodeId);
      if (!existingNode) {
        return res.status(404).json({ 
          success: false, 
          message: "Mind node not found" 
        });
      }
      
      if (existingNode.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "Unauthorized access to mind node" 
        });
      }
      
      const relationships = await storage.getNodeRelationships(nodeId);
      
      // Get related nodes for each relationship
      const relatedNodesPromises = relationships.map(async (rel) => {
        const sourceId = rel.source_id === nodeId ? rel.target_id : rel.source_id;
        const relatedNode = await storage.getMindNode(sourceId);
        
        return {
          ...rel,
          related_node: relatedNode
        };
      });
      
      const relatedNodes = await Promise.all(relatedNodesPromises);
      
      res.status(200).json({
        success: true,
        data: relatedNodes
      });
    } catch (error) {
      console.error("Error getting node relationships:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while getting node relationships"
      });
    }
  });
  
  app.post("/api/node-relationships", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      
      // Validate relationship data
      const relationshipSchema = insertNodeRelationshipSchema.extend({
        source_id: z.number(),
        target_id: z.number(),
        relationship_type: z.string().min(1)
      });
      
      const validatedData = relationshipSchema.parse(req.body);
      
      // Check if both nodes exist and belong to the user
      const sourceNode = await storage.getMindNode(validatedData.source_id);
      const targetNode = await storage.getMindNode(validatedData.target_id);
      
      if (!sourceNode || !targetNode) {
        return res.status(404).json({ 
          success: false, 
          message: "Source or target node not found" 
        });
      }
      
      if (sourceNode.user_id !== userId || targetNode.user_id !== userId) {
        return res.status(403).json({ 
          success: false, 
          message: "Unauthorized access to mind nodes" 
        });
      }
      
      // Create the relationship
      const relationship = await storage.createNodeRelationship(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Node relationship created successfully",
        data: relationship
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating node relationship:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while creating node relationship"
        });
      }
    }
  });
  
  app.delete("/api/node-relationships/:id", authenticateToken, async (req, res) => {
    try {
      const userId = req.body.userId;
      const relationshipId = parseInt(req.params.id);
      
      // For simplicity in our storage implementation, we'll assume the relationship exists
      // In a real database implementation, we would query for the specific relationship by ID
      
      // First verify if the user has access to linked nodes
      // We'll need to add a method to our storage interface
      const allNodes = await storage.getMindNodesByUserId(userId);
      const nodeIds = allNodes.map(node => node.id);
      
      // Get relationships for all user's nodes to find this specific one
      let targetRelationship = null;
      for (const nodeId of nodeIds) {
        const relationships = await storage.getNodeRelationships(nodeId);
        const found = relationships.find(rel => rel.id === relationshipId);
        if (found) {
          targetRelationship = found;
          break;
        }
      }
      
      if (!targetRelationship) {
        return res.status(404).json({ 
          success: false, 
          message: "Node relationship not found or you don't have access to it" 
        });
      }
      
      // Now we're sure the relationship belongs to one of the user's nodes
      
      // Delete the relationship
      await storage.deleteNodeRelationship(relationshipId);
      
      res.status(200).json({
        success: true,
        message: "Node relationship deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting node relationship:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting node relationship"
      });
    }
  });
  
  // Legacy contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store the contact message
      const contact = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact message received successfully",
        id: contact.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request"
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
