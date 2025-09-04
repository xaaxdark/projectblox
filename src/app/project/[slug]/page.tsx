'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, Star, Users, Play } from 'lucide-react';
import { Project, ProjectStep } from '@/types';
import { cn, getDifficultyLabel, getDifficultyColor } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [steps, setSteps] = useState<ProjectStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const getSlugAndLoad = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      loadProjectData(resolvedParams.slug);
    };
    getSlugAndLoad();
  }, [params]);

  const loadProjectData = async (projectSlug: string) => {
    try {
      setIsLoading(true);
      
      const [projectRes, stepsRes] = await Promise.all([
        fetch(`/api/projects/${projectSlug}`),
        fetch(`/api/projects/${projectSlug}/steps`)
      ]);

      if (projectRes.ok) {
        const projectData = await projectRes.json();
        setProject(projectData);
      } else {
        setError('Project not found');
      }

      if (stepsRes.ok) {
        const stepsData = await stepsRes.json();
        setSteps(stepsData);
      }
    } catch (err) {
      setError('Failed to load project');
      console.error('Error loading project:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={cn(
            'h-4 w-4',
            i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          )} 
        />
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600">({count} reviews)</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            <Link href="/" className="text-2xl font-bold text-gray-900">
              🧱 ProjectBlox
            </Link>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-8xl">
            {project.category_icon || '🛠️'}
          </div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white',
                    getDifficultyColor(project.difficulty_level)
                  )}>
                    {getDifficultyLabel(project.difficulty_level)}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{project.category_name}</span>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{project.estimated_time}</span>
              </div>
              {project.materials_cost && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{project.materials_cost}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">{project.completions_count} completed</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              {renderStars(project.rating_avg, project.rating_count)}
            </div>

            {/* CTA Button */}
            <button className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Play className="h-5 w-5" />
              Start This Project
            </button>
          </div>
        </div>

        {/* Steps Section */}
        {steps.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Step-by-Step Guide ({steps.length} steps)
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={cn(
                    'border border-gray-200 rounded-lg p-6 cursor-pointer transition-all',
                    activeStep === index ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                  )}
                  onClick={() => setActiveStep(activeStep === index ? null : index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.step_number}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        {step.estimated_minutes && (
                          <span className="text-sm text-gray-500">{step.estimated_minutes}min</span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      {activeStep === index && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          {step.tips && step.tips.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-green-700 mb-2">💡 Tips:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {step.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="text-sm text-green-600">{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {step.commonMistakes && step.commonMistakes.length > 0 && (
                            <div>
                              <h4 className="font-medium text-red-700 mb-2">⚠️ Common Mistakes:</h4>
                              <ul className="list-disc list-inside space-y-1">
                                {step.commonMistakes.map((mistake, mistakeIndex) => (
                                  <li key={mistakeIndex} className="text-sm text-red-600">{mistake}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
