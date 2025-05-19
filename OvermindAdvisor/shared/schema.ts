import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Node types for Overmind
export enum NodeType {
  TASK = "task",
  IDEA = "idea",
  NOTE = "note",
  PROJECT = "project",
  GOAL = "goal",
}

// Node status for Overmind
export enum NodeStatus {
  ACTIVE = "active",
  IN_PROGRESS = "in-progress",
  DONE = "done",
  ARCHIVED = "archived",
}

// Mind nodes table
export const mindNodes = pgTable("mind_nodes", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").notNull(), // Using enum NodeType
  status: text("status").notNull(), // Using enum NodeStatus
  priority: integer("priority").notNull(), // 1-5
  tags: text("tags").array(), // Array of tags
  ai_notes: text("ai_notes"), // AI-generated context/suggestions
  position_x: integer("position_x").default(0), // Position on the mind map
  position_y: integer("position_y").default(0), // Position on the mind map
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const insertMindNodeSchema = createInsertSchema(mindNodes).pick({
  user_id: true,
  title: true,
  content: true,
  type: true,
  status: true,
  priority: true,
  tags: true,
  ai_notes: true,
  position_x: true,
  position_y: true,
});

export type InsertMindNode = z.infer<typeof insertMindNodeSchema>;
export type MindNode = typeof mindNodes.$inferSelect;

// Node relationships table (for connecting nodes)
export const nodeRelationships = pgTable("node_relationships", {
  id: serial("id").primaryKey(),
  source_id: integer("source_id").notNull().references(() => mindNodes.id),
  target_id: integer("target_id").notNull().references(() => mindNodes.id),
  relationship_type: text("relationship_type").notNull(), // e.g., "parent-child", "related", "depends-on"
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertNodeRelationshipSchema = createInsertSchema(nodeRelationships).pick({
  source_id: true,
  target_id: true,
  relationship_type: true,
});

export type InsertNodeRelationship = z.infer<typeof insertNodeRelationshipSchema>;
export type NodeRelationship = typeof nodeRelationships.$inferSelect;

// Keep existing contact messages for legacy support
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  is_read: boolean("is_read").default(false).notNull(),
});

export const insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
