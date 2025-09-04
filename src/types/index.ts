/**
 * ProjectBlox TypeScript Type Definitions
 * 
 * This file contains all the core interfaces and types used throughout the ProjectBlox application.
 */

/**
 * Represents a DIY project in the ProjectBlox platform
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Display name of the project */
  title: string;
  /** URL-friendly identifier for the project */
  slug: string;
  /** Brief description of what the project involves */
  description: string;
  /** Optional thumbnail image URL for the project */
  thumbnail?: string;
  /** ID of the category this project belongs to */
  categoryId: string;
  /** ID of the user who created this project */
  creatorId: string;
  /** Difficulty level from 1 (beginner) to 5 (expert) */
  difficultyLevel: number;
  /** Estimated time to complete the project (e.g., "2-3 hours") */
  estimatedTime: string;
  /** Optional estimated cost of materials needed */
  materialsCost?: string;
  /** Whether this project requires a premium subscription */
  isPremium: boolean;
  /** Whether this project is featured on the homepage */
  isFeatured: boolean;
  /** Whether this project is published and visible to users */
  isPublished: boolean;
  /** Total number of times this project has been viewed */
  viewsCount: number;
  /** Total number of times this project has been completed */
  completionsCount: number;
  /** Average rating from user reviews (0-5) */
  ratingAvg: number;
  /** Total number of ratings received */
  ratingCount: number;
  /** ISO timestamp when the project was created */
  createdAt: string;
  /** ISO timestamp when the project was last updated */
  updatedAt: string;
}

/**
 * Represents a single step within a project
 */
export interface ProjectStep {
  /** Unique identifier for the step */
  id: string;
  /** ID of the project this step belongs to */
  projectId: string;
  /** Sequential number of this step within the project */
  stepNumber: number;
  /** Title of the step */
  title: string;
  /** Detailed description of what to do in this step */
  description: string;
  /** Optional image URL showing the step in progress */
  imageUrl?: string;
  /** Optional video URL demonstrating the step */
  videoUrl?: string;
  /** Optional estimated time to complete this step in minutes */
  estimatedMinutes?: number;
  /** Array of helpful tips for this step */
  tips: string[];
  /** Array of common mistakes to avoid in this step */
  commonMistakes: string[];
}

/**
 * Represents a project category (e.g., "Woodworking", "Electronics")
 */
export interface Category {
  /** Unique identifier for the category */
  id: string;
  /** Display name of the category */
  name: string;
  /** URL-friendly identifier for the category */
  slug: string;
  /** Optional description of the category */
  description?: string;
  /** Icon identifier or URL for the category */
  icon: string;
  /** Hex color code for the category theme */
  color: string;
  /** Sort order for displaying categories */
  sortOrder: number;
}

/**
 * Represents a user in the ProjectBlox platform
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** Optional unique username */
  username?: string;
  /** Optional avatar image URL */
  avatar?: string;
  /** Optional user biography */
  bio?: string;
  /** User's subscription plan */
  plan: 'free' | 'pro';
  /** Total number of projects completed by this user */
  projectsCompleted: number;
  /** Current streak of consecutive days with activity */
  streakDays: number;
  /** ISO timestamp of the user's last activity */
  lastActivity?: string;
  /** ISO timestamp when the user account was created */
  createdAt: string;
  /** ISO timestamp when the user account was last updated */
  updatedAt: string;
}

/**
 * Represents a user's progress on a specific project
 */
export interface UserProgress {
  /** Unique identifier for the progress record */
  id: string;
  /** ID of the user */
  userId: string;
  /** ID of the project */
  projectId: string;
  /** Current status of the user's progress on this project */
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
  /** Current step number the user is on (0-based) */
  currentStep: number;
  /** Array of step numbers that have been completed */
  completedSteps: number[];
  /** ISO timestamp when the user started the project */
  startedAt?: string;
  /** ISO timestamp when the user completed the project */
  completedAt?: string;
  /** Total time spent on the project in minutes */
  timeSpentMinutes: number;
  /** Optional image URL of the user's completed project */
  resultImage?: string;
  /** Optional notes about the user's experience with the project */
  resultNotes?: string;
  /** Optional rating given by the user (1-5) */
  rating?: number;
}

