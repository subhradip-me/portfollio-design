import { useState, useCallback, useMemo } from 'react';
import { projectsService, testimonialsService } from '../services';
import { useAuthContext } from '../context/AuthContext';

/**
 * Retry configuration for API calls
 */
const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Delay utility for retry logic
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Execute API call with retry logic
 */
const executeWithRetry = async (apiCall, retryConfig = {}) => {
  const config = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let lastError;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      const result = await apiCall();
      return result;
    } catch (error) {
      lastError = error;
      
      // Check if we should retry
      const shouldRetry = attempt < config.maxRetries && (
        error?.response?.status === undefined || // Network errors
        config.retryableStatuses.includes(error.response.status)
      );

      if (!shouldRetry) {
        throw error;
      }

      // Wait before retrying with exponential backoff
      const backoffDelay = config.retryDelay * Math.pow(2, attempt);
      await delay(backoffDelay);
    }
  }

  throw lastError;
};

/**
 * Custom hook for authentication
 * Returns the authentication context (user, login, logout, etc.)
 * Memoized to prevent unnecessary re-renders
 */
export const useAuth = () => {
  const auth = useAuthContext();
  return useMemo(() => auth, [auth]);
};

/**
 * Custom hook for managing projects
 * Provides CRUD operations and state management for projects
 */
export const useProjects = (retryConfig = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const config = useMemo(() => ({ ...DEFAULT_RETRY_CONFIG, ...retryConfig }), [retryConfig]);

  /**
   * Fetch projects with optional filters and pagination
   * @param {Object} params - Query parameters (status, page, limit, etc.)
   */
  const fetchProjects = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    setRetryCount(0);
    try {
      const result = await executeWithRetry(
        () => projectsService.getProjects(params),
        config
      );
      if (result.success) {
        setProjects(result.data.projects);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config]);

  /**
   * Create a new project
   * @param {Object} projectData - Project data to create
   */
  const createProject = useCallback(async (projectData) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => projectsService.createProject(projectData),
        config
      );
      if (result.success) {
        // Refresh projects list to show new project
        await fetchProjects();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchProjects]);

  /**
   * Update an existing project
   * @param {string} id - Project ID
   * @param {Object} projectData - Updated project data
   */
  const updateProject = useCallback(async (id, projectData) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => projectsService.updateProject(id, projectData),
        config
      );
      if (result.success) {
        // Refresh projects list
        await fetchProjects();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchProjects]);

  const deleteProject = useCallback(async (id) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => projectsService.deleteProject(id),
        config
      );
      if (result.success) {
        // Refresh projects list
        await fetchProjects();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchProjects]);

  return useMemo(() => ({
    projects,
    loading,
    error,
    pagination,
    retryCount,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }), [projects, loading, error, pagination, retryCount, fetchProjects, createProject, updateProject, deleteProject]);
};

// Custom hook for testimonials
export const useTestimonials = (retryConfig = {}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const config = useMemo(() => ({ ...DEFAULT_RETRY_CONFIG, ...retryConfig }), [retryConfig]);

  const fetchTestimonials = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.getTestimonials(params),
        config
      );
      if (result.success) {
        setTestimonials(result.data.testimonials);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch testimonials');
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config]);

  const fetchFeaturedTestimonials = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.getFeaturedTestimonials(params),
        config
      );
      if (result.success) {
        setTestimonials(result.data.testimonials);
        setPagination(result.data.pagination);
      } else {
        setError(result.error.message);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Failed to fetch testimonials');
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config]);

  const createTestimonial = useCallback(async (testimonialData) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.createTestimonial(testimonialData),
        config
      );
      if (result.success) {
        await fetchTestimonials();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchTestimonials]);

  const updateTestimonial = useCallback(async (id, testimonialData) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.updateTestimonial(id, testimonialData),
        config
      );
      if (result.success) {
        await fetchTestimonials();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchTestimonials]);

  const deleteTestimonial = useCallback(async (id) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.deleteTestimonial(id),
        config
      );
      if (result.success) {
        await fetchTestimonials();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchTestimonials]);

  const approveTestimonial = useCallback(async (id) => {
    setLoading(true);
    try {
      const result = await executeWithRetry(
        () => testimonialsService.approveTestimonial(id),
        config
      );
      if (result.success) {
        await fetchTestimonials();
      }
      return result;
    } catch (err) {
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, [config, fetchTestimonials]);

  return useMemo(() => ({
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
  }), [testimonials, loading, error, pagination, fetchTestimonials, fetchFeaturedTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, approveTestimonial]);
};

// Custom hook for API calls with loading state
export const useApiCall = (retryConfig = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = useMemo(() => ({ ...DEFAULT_RETRY_CONFIG, ...retryConfig }), [retryConfig]);

  const execute = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const result = await executeWithRetry(apiCall, config);
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
  }, [config]);

  return useMemo(() => ({ loading, error, execute }), [loading, error, execute]);
};
