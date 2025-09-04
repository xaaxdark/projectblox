import React from 'react';
import Link from 'next/link';
import { Star, Clock, DollarSign, Users } from 'lucide-react';
import { Project } from '@/types';
import { cn, getDifficultyLabel, getDifficultyColor, formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  showProgress?: boolean;
  className?: string;
}

export function ProjectCard({ project, showProgress = false, className }: ProjectCardProps) {
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Link href={`/project/${project.slug}`}>
      <div className={cn(
        'bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer',
        className
      )}>
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl">
          {project.category_icon || '🛠️'}
        </div>
        
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                {project.title}
              </h3>
              <div className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white',
                getDifficultyColor(project.difficulty_level)
              )}>
                {getDifficultyLabel(project.difficulty_level)}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Metadata */}
          <div className="space-y-2">
            {/* Time and Cost */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{project.estimated_time}</span>
                </div>
                {project.materials_cost && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{project.materials_cost}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {renderStars(project.rating_avg)}
                </div>
                <span className="text-xs text-gray-500">
                  ({project.rating_count})
                </span>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{project.completions_count}</span>
                </div>
                <span>{project.views_count} views</span>
              </div>
            </div>

            {/* Date */}
            <div className="text-xs text-gray-400">
              {formatDate(project.created_at)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
