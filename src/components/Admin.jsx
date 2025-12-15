import React, { useState, useMemo } from 'react'
import Header from './Header'
import { useProjects, useTestimonials, useAuth } from '../hooks/useApi'
import LoginForm from './LoginForm'

export default function Admin() {
  // Component state
  const [activeTab, setActiveTab] = useState('projects')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  
  // API hooks - must be called unconditionally
  const authState = useAuth()
  const projectsState = useProjects()
  const testimonialsState = useTestimonials()
  
  // Derived state with fallbacks
  const isAuthenticated = authState?.isAuthenticated ?? false
  const projects = projectsState?.projects || []
  const testimonials = testimonialsState?.testimonials || []
  
  // Memoized API functions to prevent unnecessary re-renders
  const apiActions = useMemo(() => ({
    createProject: projectsState?.createProject || (() => Promise.resolve({ success: true })),
    updateProject: projectsState?.updateProject || (() => Promise.resolve({ success: true })),
    deleteProject: projectsState?.deleteProject || (() => Promise.resolve({ success: true })),
    createTestimonial: testimonialsState?.createTestimonial || (() => Promise.resolve({ success: true })),
    updateTestimonial: testimonialsState?.updateTestimonial || (() => Promise.resolve({ success: true })),
    deleteTestimonial: testimonialsState?.deleteTestimonial || (() => Promise.resolve({ success: true }))
  }), [
    projectsState?.createProject,
    projectsState?.updateProject,
    projectsState?.deleteProject,
    testimonialsState?.createTestimonial,
    testimonialsState?.updateTestimonial,
    testimonialsState?.deleteTestimonial
  ])

  // Load data on component mount
  // useEffect(() => {
  //   // Only fetch data when authenticated and not loading
  //   if (isAuthenticated) {
  //     if (activeTab === 'projects') {
  //       projectsState?.fetchProjects?.({ status: 'all' }) // Admin can see all projects
  //     } else if (activeTab === 'testimonials') {
  //       testimonialsState?.fetchTestimonials?.({ status: 'all' }) // Admin can see all testimonials
  //     }
  //   }
  // }, [activeTab, isAuthenticated]) // Simplified dependencies

  // Show loading while auth is initializing
  if (authState?.loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        {/* Background Elements - matching portfolio theme */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-24 w-px h-16 bg-zinc-200"></div>
          <div className="absolute bottom-32 left-20 w-12 h-px bg-zinc-200"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-zinc-300 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-zinc-100 rounded-full"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-4 tracking-tight">
              Loading<span className='text-zinc-400'>.Panel</span>
            </h1>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-px bg-zinc-200"></div>
              <div className="w-1 h-1 bg-zinc-300 rounded-full animate-pulse"></div>
              <div className="w-8 h-px bg-zinc-200"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            
            <p className="text-sm text-zinc-500 font-mono tracking-wide">
              INITIALIZING AUTHENTICATION...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Authentication check - show login if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />
  }

  // Event handlers
  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const result = await apiActions.deleteProject(id)
      if (result.success) {
        console.log('Project deleted successfully')
      } else {
        console.error('Failed to delete project:', result.error)
      }
    }
  }

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const result = await apiActions.deleteTestimonial(id)
      if (result.success) {
        console.log('Testimonial deleted successfully')
      } else {
        console.error('Failed to delete testimonial:', result.error)
      }
    }
  }

  const handleSaveProject = async (project) => {
    try {
      let result
      if (editingProject) {
        // Update existing project
        result = await apiActions.updateProject(editingProject._id || editingProject.id, project)
        setEditingProject(null)
      } else {
        // Create new project
        result = await apiActions.createProject(project)
      }
      
      if (result.success) {
        console.log('Project saved successfully')
        setShowProjectForm(false)
      } else {
        console.error('Failed to save project:', result.error)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowProjectForm(true)
  }

  const handleSaveTestimonial = async (testimonial) => {
    try {
      let result
      if (editingTestimonial) {
        // Update existing testimonial
        result = await apiActions.updateTestimonial(editingTestimonial._id || editingTestimonial.id, testimonial)
        setEditingTestimonial(null)
      } else {
        // Create new testimonial
        result = await apiActions.createTestimonial(testimonial)
      }
      
      if (result.success) {
        console.log('Testimonial saved successfully')
        setShowTestimonialForm(false)
      } else {
        console.error('Failed to save testimonial:', result.error)
      }
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
    setShowTestimonialForm(true)
  }

  // Project Form Component
  const ProjectForm = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState(project || {
      title: '',
      subtitle: '',
      description: '',
      technologies: [],
      year: new Date().getFullYear(),
      featured: false,
      thumbnailUrl: '',
      liveUrl: '',
      githubUrl: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      const techArray = typeof formData.technologies === 'string' 
        ? formData.technologies.split(',').map(t => t.trim())
        : formData.technologies
      
      onSave({
        ...formData,
        technologies: techArray,
      })
    }

    return (
      <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-sm relative">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  {project ? 'Edit Project' : 'New Project'}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {project ? 'Update project details' : 'Add project to portfolio'}
                </p>
              </div>
              <button
                onClick={onCancel}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                placeholder="Enter project title..."
                required
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">Subtitle</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                placeholder="e.g., Full Stack Web App"
              />
            </div>

            {/* Thumbnail URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400 resize-none"
                placeholder="Describe your project..."
                rows={3}
              />
            </div>

            {/* Live URL and GitHub URL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">Live Demo URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">Technologies</label>
                <input
                  type="text"
                  value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="React, Node.js..."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="2024"
                />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">Featured Project</h4>
                  <p className="text-xs text-zinc-500">Highlight in portfolio</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-zinc-500 hover:text-zinc-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                {project ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Testimonial Form Component
  const TestimonialForm = ({ testimonial, onSave, onCancel }) => {
    const [formData, setFormData] = useState(testimonial || {
      name: '',
      position: '',
      company: '',
      message: '',
      rating: 5,
      featured: false,
      avatarUrl: ''
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      onSave({
        ...formData,
        id: testimonial?.id || Date.now()
      })
    }

    return (
      <div className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-zinc-200 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-sm relative">
          {/* Header */}
          <div className="p-6 border-b border-zinc-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-zinc-900">
                  {testimonial ? 'Edit Testimonial' : 'New Testimonial'}
                </h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {testimonial ? 'Update client feedback' : 'Add client feedback'}
                </p>
              </div>
              <button
                onClick={onCancel}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Avatar URL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Avatar URL
              </label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                placeholder="https://example.com/avatar.jpg (optional)"
              />
            </div>

            {/* Name & Company */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                  placeholder="TechCorp Inc."
                />
              </div>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Position/Title
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400"
                placeholder="CEO, Product Manager, etc."
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 mb-3">Rating</label>
              <div className="flex items-center justify-center space-x-1">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`w-8 h-8 transition-colors duration-200 ${
                      star <= formData.rating 
                        ? 'text-zinc-900' 
                        : 'text-zinc-300 hover:text-zinc-500'
                    }`}
                  >
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Testimonial Message */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                Testimonial Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent bg-white text-zinc-900 placeholder-zinc-400 resize-none"
                placeholder="Share what this client thought about your work..."
                rows={4}
                required
              />
            </div>

            {/* Featured Toggle */}
            <div className="border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">Featured Testimonial</h4>
                  <p className="text-xs text-zinc-500">Highlight prominently</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-900"></div>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-zinc-500 hover:text-zinc-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              >
                {testimonial ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 relative">
        {/* Refined Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-zinc-300/30 to-transparent opacity-60"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-zinc-300/30 to-transparent opacity-60"></div>
          <div className="absolute top-1/3 right-1/5 w-1.5 h-1.5 bg-zinc-400/40 rounded-full"></div>
          <div className="absolute top-2/3 left-1/6 w-20 h-20 border border-zinc-200/40 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/6 w-12 h-12 border border-zinc-300/30 rotate-45"></div>
        </div>

        {/* HERO SECTION */}
        <section className="relative z-10 min-h-screen flex items-center justify-center pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent"></div>
                <span className="text-xs font-mono text-zinc-500 tracking-[0.3em] uppercase">Dashboard</span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent"></div>
              </div>
              
              <h1 className="text-7xl lg:text-9xl font-extralight text-zinc-900 leading-none tracking-tight mb-6">
                Content
                <br />
                <span className="bg-gradient-to-r from-zinc-600 to-zinc-800 bg-clip-text text-transparent">
                  Studio
                </span>
              </h1>
              
              <p className="text-zinc-600 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
                Create, edit, and curate your portfolio content with an intuitive interface designed for efficiency and creativity.
              </p>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-extralight text-zinc-900 mb-3">{projects.length}</div>
                  <div className="text-sm text-zinc-600 uppercase tracking-wider font-medium">Projects</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-extralight text-zinc-900 mb-3">{testimonials.length}</div>
                  <div className="text-sm text-zinc-600 uppercase tracking-wider font-medium">Testimonials</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl font-extralight text-zinc-900 mb-3">
                    {projects.filter(p => p.featured).length + testimonials.filter(t => t.featured).length}
                  </div>
                  <div className="text-sm text-zinc-600 uppercase tracking-wider font-medium">Featured</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="relative z-10 bg-white/50 backdrop-blur-sm border-t border-zinc-200/60 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 pt-28">
            {/* Content Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-2 h-12 bg-zinc-900 rounded-full"></div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-extralight text-zinc-900 leading-none">
                    {activeTab === 'projects' ? 'Projects' : 'Testimonials'}
                  </h2>
                  <p className="text-zinc-600 mt-1">
                    {activeTab === 'projects' ? 'Showcase your best work' : 'Client feedback & reviews'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Toggle buttons */}
                <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-2xl p-1.5 shadow-lg flex flex-col sm:flex-row">
                  <button 
                    onClick={() => setActiveTab('projects')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      activeTab === 'projects' 
                        ? 'bg-zinc-900 text-white shadow-lg' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14-7v14a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2zM9 11h6" />
                    </svg>
                    <span>Projects</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('testimonials')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      activeTab === 'testimonials' 
                        ? 'bg-zinc-900 text-white shadow-lg' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Testimonials</span>
                  </button>
                </div>

                <button 
                  onClick={() => activeTab === 'projects' ? setShowProjectForm(true) : setShowTestimonialForm(true)}
                  className="group relative bg-zinc-900 text-white px-6 py-3 rounded-2xl hover:bg-zinc-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
                >
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">
                    {activeTab === 'projects' ? 'Create Project' : 'Add Testimonial'}
                  </span>
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeTab === 'projects' ? (
                <>
                  {/* Projects */}
                  {projects.map((project) => (
                    <div key={project._id || project.id} className="group bg-white/70 backdrop-blur-sm border border-zinc-200/60 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      <div className="aspect-video overflow-hidden relative bg-zinc-200">
                        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                          <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        {project.featured && (
                          <div className="absolute top-3 right-3 px-2 py-1 bg-zinc-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:text-zinc-700 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-xs text-zinc-600 font-medium">{project.subtitle}</p>
                            </div>
                            <span className="text-xs text-zinc-400 font-mono bg-zinc-100 px-2 py-1 rounded">
                              {project.year}
                            </span>
                          </div>
                          
                          <p className="text-zinc-700 text-sm leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5">
                          {(project.technologies || project.tech || []).map((tech, index) => (
                            <span key={index} className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full border border-zinc-200/60">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-4 border-t border-zinc-200/60">
                          <button 
                            onClick={() => handleEditProject(project)}
                            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all duration-200" 
                            title="Edit Project"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project._id || project.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200" 
                            title="Delete Project"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Project Card */}
                  <button 
                    onClick={() => setShowProjectForm(true)}
                    className="group min-h-[300px] bg-white/40 backdrop-blur-sm border-2 border-dashed border-zinc-300 rounded-3xl hover:border-zinc-400 hover:bg-white/60 transition-all duration-300 flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-zinc-200 rounded-2xl flex items-center justify-center group-hover:bg-zinc-300 transition-colors">
                      <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-zinc-900 mb-1">Add New Project</div>
                      <div className="text-sm text-zinc-600">Showcase your latest work</div>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  {/* Testimonials */}
                  {testimonials.map((testimonial) => (
                    <div key={testimonial._id || testimonial.id} className="group bg-white/70 backdrop-blur-sm border border-zinc-200/60 rounded-3xl p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative">
                      {/* Quote Icon */}
                      <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>

                      {testimonial.featured && (
                        <div className="absolute top-4 left-4 px-2 py-1 bg-zinc-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                          Featured
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        {/* Client Info */}
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-zinc-200 rounded-2xl overflow-hidden ring-2 ring-white shadow-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-zinc-900 text-base">{testimonial.name}</h3>
                            <p className="text-zinc-600 text-sm font-medium">{testimonial.position}</p>
                            {testimonial.company && (
                              <p className="text-zinc-500 text-xs mt-0.5">{testimonial.company}</p>
                            )}
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 transition-colors ${
                                i < testimonial.rating ? 'text-yellow-400' : 'text-zinc-200'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* Message */}
                        <blockquote className="text-zinc-700 text-center italic leading-relaxed text-sm">
                          "{testimonial.message}"
                        </blockquote>
                        
                        {/* Actions */}
                        <div className="flex justify-center space-x-2 pt-4 border-t border-zinc-200/60">
                          <button 
                            onClick={() => handleEditTestimonial(testimonial)}
                            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all duration-200" 
                            title="Edit Testimonial"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteTestimonial(testimonial._id || testimonial.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200" 
                            title="Delete Testimonial"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Testimonial Card */}
                  <button 
                    onClick={() => setShowTestimonialForm(true)}
                    className="group min-h-[300px] bg-white/40 backdrop-blur-sm border-2 border-dashed border-zinc-300 rounded-3xl hover:border-zinc-400 hover:bg-white/60 transition-all duration-300 flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-zinc-200 rounded-2xl flex items-center justify-center group-hover:bg-zinc-300 transition-colors">
                      <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <div className="text-base font-medium text-zinc-900 mb-1">Add Testimonial</div>
                      <div className="text-sm text-zinc-600">Share client feedback</div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setShowProjectForm(false)
            setEditingProject(null)
          }}
        />
      )}

      {showTestimonialForm && (
        <TestimonialForm
          testimonial={editingTestimonial}
          onSave={handleSaveTestimonial}
          onCancel={() => {
            setShowTestimonialForm(false)
            setEditingTestimonial(null)
          }}
        />
      )}
    </>
  )
}
