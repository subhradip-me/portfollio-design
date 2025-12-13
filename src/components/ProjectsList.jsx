import React, { useEffect } from 'react';
import { useProjects } from '../hooks/useApi';

const ProjectsList = () => {
  const { projects, loading, error, fetchProjects } = useProjects();

  useEffect(() => {
    // Fetch projects on component mount
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-white">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-600 text-white p-4 rounded">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="bg-gray-900 rounded-lg overflow-hidden">
            {project.thumbnailUrl && (
              <img 
                src={project.thumbnailUrl} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                {project.featured && (
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              {project.subtitle && (
                <p className="text-gray-400 mb-3">{project.subtitle}</p>
              )}
              
              <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies && project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{project.year}</span>
                <div className="flex gap-2">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              
              {project.views !== undefined && (
                <div className="mt-3 text-xs text-gray-500">
                  {project.views} views
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 py-12">
          No projects found. Create your first project to get started!
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
