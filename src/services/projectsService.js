import api, { handleApiResponse, handleApiError } from './api.js';

// Projects Service
export const projectsService = {
  // Get all projects (public)
  async getProjects(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      if (params.featured !== undefined) queryParams.set('featured', params.featured);
      if (params.year) queryParams.set('year', params.year);
      if (params.tech) queryParams.set('tech', params.tech);
      if (params.search) queryParams.set('search', params.search);
      if (params.sortBy) queryParams.set('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);
      if (params.status) queryParams.set('status', params.status);
      
      const url = `/projects${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get projects by technology (public)
  async getProjectsByTechnology(technology, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      
      const url = `/projects/technology/${encodeURIComponent(technology)}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get projects by year (public)
  async getProjectsByYear(year, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      
      const url = `/projects/year/${year}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get project statistics (public)
  async getProjectStatistics() {
    try {
      const response = await api.get('/projects/statistics');
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get single project (public)
  async getProject(id) {
    try {
      const response = await api.get(`/projects/${id}`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Create project (protected - requires authentication)
  async createProject(projectData) {
    try {
      const response = await api.post('/projects', projectData);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Update project (protected - requires authentication)
  async updateProject(id, projectData) {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Toggle featured status (protected - requires authentication)
  async toggleFeatured(id) {
    try {
      const response = await api.patch(`/projects/${id}/toggle-featured`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Delete project (protected - requires authentication)
  async deleteProject(id) {
    try {
      const response = await api.delete(`/projects/${id}`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  }
};
