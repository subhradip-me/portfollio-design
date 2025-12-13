import { useState } from 'react';
import { projectsService, testimonialsService } from '../services';
import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook for authentication
 * Returns the authentication context (user, login, logout, etc.)
 */
export const useAuth = () => {
  return useAuthContext();
};

/**
 * Custom hook for managing projects
 * Provides CRUD operations and state management for projects
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  /**
   * Fetch projects with optional filters and pagination
   * @param {Object} params - Query parameters (status, page, limit, etc.)
   */
  const fetchProjects = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await projectsService.getProjects(params);
      if (result.success) {
        setProjects(result.data.projects);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new project
   * @param {Object} projectData - Project data to create
   */
  const createProject = async (projectData) => {
    setLoading(true);
    try {
      const result = await projectsService.createProject(projectData);
      if (result.success) {
        // Refresh projects list to show new project
        await fetchProjects();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing project
   * @param {string} id - Project ID
   * @param {Object} projectData - Updated project data
   */
  const updateProject = async (id, projectData) => {
    setLoading(true);
    try {
      const result = await projectsService.updateProject(id, projectData);
      if (result.success) {
        // Refresh projects list
        await fetchProjects();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const result = await projectsService.deleteProject(id);
      if (result.success) {
        // Refresh projects list
        await fetchProjects();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    pagination,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

// Custom hook for testimonials
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchTestimonials = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await testimonialsService.getTestimonials(params);
      if (result.success) {
        setTestimonials(result.data.testimonials);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedTestimonials = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await testimonialsService.getFeaturedTestimonials(params);
      if (result.success) {
        setTestimonials(result.data.testimonials);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData) => {
    setLoading(true);
    try {
      const result = await testimonialsService.createTestimonial(testimonialData);
      if (result.success) {
        // Refresh testimonials list
        await fetchTestimonials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const updateTestimonial = async (id, testimonialData) => {
    setLoading(true);
    try {
      const result = await testimonialsService.updateTestimonial(id, testimonialData);
      if (result.success) {
        // Refresh testimonials list
        await fetchTestimonials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id) => {
    setLoading(true);
    try {
      const result = await testimonialsService.deleteTestimonial(id);
      if (result.success) {
        // Refresh testimonials list
        await fetchTestimonials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const approveTestimonial = async (id) => {
    setLoading(true);
    try {
      const result = await testimonialsService.approveTestimonial(id);
      if (result.success) {
        // Refresh testimonials list
        await fetchTestimonials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    testimonials,
    loading,
    error,
    pagination,
    fetchTestimonials,
    fetchFeaturedTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    approveTestimonial,
  };
};

// Custom hook for API calls with loading state
export const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      if (!result.success) {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, execute };
};
