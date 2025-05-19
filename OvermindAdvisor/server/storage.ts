import { 
  users, type User, type InsertUser,
  mindNodes, type MindNode, type InsertMindNode,
  nodeRelationships, type NodeRelationship, type InsertNodeRelationship,
  contactMessages, type ContactMessage, type InsertContact,
  NodeType, NodeStatus
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Mind node methods
  getMindNode(id: number): Promise<MindNode | undefined>;
  getMindNodesByUserId(userId: number): Promise<MindNode[]>;
  getMindNodesByTag(userId: number, tag: string): Promise<MindNode[]>;
  getMindNodesByType(userId: number, type: NodeType): Promise<MindNode[]>;
  getMindNodesByStatus(userId: number, status: NodeStatus): Promise<MindNode[]>;
  searchMindNodes(userId: number, query: string): Promise<MindNode[]>;
  createMindNode(node: InsertMindNode): Promise<MindNode>;
  updateMindNode(id: number, node: Partial<InsertMindNode>): Promise<MindNode | undefined>;
  deleteMindNode(id: number): Promise<boolean>;
  
  // Node relationships methods
  getNodeRelationships(nodeId: number): Promise<NodeRelationship[]>;
  createNodeRelationship(relationship: InsertNodeRelationship): Promise<NodeRelationship>;
  deleteNodeRelationship(id: number): Promise<boolean>;
  
  // Contact form (legacy support)
  createContactMessage(contact: InsertContact): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private mindNodes: Map<number, MindNode>;
  private nodeRelationships: Map<number, NodeRelationship>;
  private contactMessages: Map<number, ContactMessage>;
  private userIdCounter: number;
  private nodeIdCounter: number;
  private relationshipIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.users = new Map();
    this.mindNodes = new Map();
    this.nodeRelationships = new Map();
    this.contactMessages = new Map();
    this.userIdCounter = 1;
    this.nodeIdCounter = 1;
    this.relationshipIdCounter = 1;
    this.contactIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const created_at = new Date();
    const user: User = { ...insertUser, id, created_at };
    this.users.set(id, user);
    return user;
  }
  
  // Mind node methods
  async getMindNode(id: number): Promise<MindNode | undefined> {
    return this.mindNodes.get(id);
  }
  
  async getMindNodesByUserId(userId: number): Promise<MindNode[]> {
    return Array.from(this.mindNodes.values()).filter(
      (node) => node.user_id === userId
    );
  }
  
  async getMindNodesByTag(userId: number, tag: string): Promise<MindNode[]> {
    return Array.from(this.mindNodes.values()).filter(
      (node) => node.user_id === userId && node.tags && node.tags.includes(tag)
    );
  }
  
  async getMindNodesByType(userId: number, type: NodeType): Promise<MindNode[]> {
    return Array.from(this.mindNodes.values()).filter(
      (node) => node.user_id === userId && node.type === type
    );
  }
  
  async getMindNodesByStatus(userId: number, status: NodeStatus): Promise<MindNode[]> {
    return Array.from(this.mindNodes.values()).filter(
      (node) => node.user_id === userId && node.status === status
    );
  }
  
  async searchMindNodes(userId: number, query: string): Promise<MindNode[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.mindNodes.values()).filter(
      (node) => 
        node.user_id === userId && 
        (node.title.toLowerCase().includes(lowercaseQuery) || 
         node.content.toLowerCase().includes(lowercaseQuery))
    );
  }
  
  async createMindNode(insertNode: InsertMindNode): Promise<MindNode> {
    const id = this.nodeIdCounter++;
    const created_at = new Date();
    const updated_at = new Date();
    // Ensure proper typing for MindNode
    const node: MindNode = {
      id,
      user_id: insertNode.user_id,
      title: insertNode.title,
      content: insertNode.content,
      type: insertNode.type,
      status: insertNode.status,
      priority: insertNode.priority,
      tags: insertNode.tags || null,
      ai_notes: insertNode.ai_notes || null,
      position_x: insertNode.position_x || 0,
      position_y: insertNode.position_y || 0,
      created_at,
      updated_at
    };
    this.mindNodes.set(id, node);
    return node;
  }
  
  async updateMindNode(id: number, updates: Partial<InsertMindNode>): Promise<MindNode | undefined> {
    const existingNode = this.mindNodes.get(id);
    if (!existingNode) {
      return undefined;
    }
    
    const updated_at = new Date();
    const updatedNode: MindNode = { ...existingNode, ...updates, updated_at };
    this.mindNodes.set(id, updatedNode);
    return updatedNode;
  }
  
  async deleteMindNode(id: number): Promise<boolean> {
    // Delete related relationships first
    const relationships = await this.getNodeRelationships(id);
    for (const rel of relationships) {
      await this.deleteNodeRelationship(rel.id);
    }
    
    return this.mindNodes.delete(id);
  }
  
  // Node relationships methods
  async getNodeRelationships(nodeId: number): Promise<NodeRelationship[]> {
    return Array.from(this.nodeRelationships.values()).filter(
      (rel) => rel.source_id === nodeId || rel.target_id === nodeId
    );
  }
  
  async createNodeRelationship(insertRelationship: InsertNodeRelationship): Promise<NodeRelationship> {
    const id = this.relationshipIdCounter++;
    const created_at = new Date();
    const relationship: NodeRelationship = { ...insertRelationship, id, created_at };
    this.nodeRelationships.set(id, relationship);
    return relationship;
  }
  
  async deleteNodeRelationship(id: number): Promise<boolean> {
    return this.nodeRelationships.delete(id);
  }
  
  // Contact form (legacy support)
  async createContactMessage(insertContact: InsertContact): Promise<ContactMessage> {
    const id = this.contactIdCounter++;
    const created_at = new Date();
    const is_read = false;
    const contact: ContactMessage = { ...insertContact, id, created_at, is_read };
    this.contactMessages.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
