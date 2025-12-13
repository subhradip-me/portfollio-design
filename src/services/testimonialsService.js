import api, { handleApiResponse, handleApiError } from './api.js';

// Testimonials Service
export const testimonialsService = {
  // Get featured testimonials (public)
  async getFeaturedTestimonials(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      
      const url = `/testimonials/featured${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get testimonials by rating (public)
  async getTestimonialsByRating(rating, params = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      
      const url = `/testimonials/rating/${rating}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get companies list (public)
  async getCompanies() {
    try {
      const response = await api.get('/testimonials/companies');
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get all testimonials (protected - requires authentication)
  async getTestimonials(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add query parameters
      if (params.page) queryParams.set('page', params.page);
      if (params.limit) queryParams.set('limit', params.limit);
      if (params.status) queryParams.set('status', params.status);
      if (params.rating) queryParams.set('rating', params.rating);
      if (params.search) queryParams.set('search', params.search);
      if (params.company) queryParams.set('company', params.company);
      if (params.featured !== undefined) queryParams.set('featured', params.featured);
      if (params.sortBy) queryParams.set('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);
      
      const url = `/testimonials${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get single testimonial (public)
  async getTestimonial(id) {
    try {
      const response = await api.get(`/testimonials/${id}`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Create testimonial (protected - requires authentication)
  async createTestimonial(testimonialData) {
    try {
      const response = await api.post('/testimonials', testimonialData);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Update testimonial (protected - requires authentication)
  async updateTestimonial(id, testimonialData) {
    try {
      const response = await api.put(`/testimonials/${id}`, testimonialData);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Approve testimonial (protected - requires authentication)
  async approveTestimonial(id) {
    try {
      const response = await api.patch(`/testimonials/${id}/approve`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Delete testimonial (protected - requires authentication)
  async deleteTestimonial(id) {
    try {
      const response = await api.delete(`/testimonials/${id}`);
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  },

  // Get testimonial statistics (protected - requires authentication)
  async getTestimonialStatistics() {
    try {
      const response = await api.get('/testimonials/statistics');
      
      return { success: true, data: handleApiResponse(response) };
    } catch (error) {
      const errorDetails = handleApiError(error);
      return { success: false, error: errorDetails };
    }
  }
};
