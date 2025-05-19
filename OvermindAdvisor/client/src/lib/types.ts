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

// Node relationship types
export enum RelationshipType {
  PARENT_CHILD = "parent-child",
  RELATED = "related",
  DEPENDS_ON = "depends-on",
  INSPIRES = "inspires",
  BLOCKS = "blocks",
}

// Interface for Mind Node
export interface MindNode {
  id: number;
  user_id: number;
  title: string;
  content: string;
  type: NodeType;
  status: NodeStatus;
  priority: number;
  tags: string[] | null;
  ai_notes: string | null;
  position_x: number;
  position_y: number;
  created_at: string | Date;
  updated_at: string | Date;
}

// Interface for Node Relationship
export interface NodeRelationship {
  id: number;
  source_id: number;
  target_id: number;
  relationship_type: string;
  created_at: string | Date;
}

// Interface for User
export interface User {
  id: number;
  username: string;
  email: string;
  token?: string;
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  errors?: any[];
}