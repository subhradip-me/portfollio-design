/**
 * Services Export Index
 * Centralized exports for all API services
 * This allows clean imports like: import { authService, api } from '../services'
 */

// Main Axios API instance with interceptors
export { default as api } from './api.js';

// Authentication service - login, register, profile management
export { authService } from './authService.js';

// Projects service - CRUD operations for projects
export { projectsService } from './projectsService.js';

// Testimonials service - CRUD operations for testimonials  
export { testimonialsService } from './testimonialsService.js';
