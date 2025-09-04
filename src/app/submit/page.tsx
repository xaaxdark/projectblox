'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, Image, Settings } from 'lucide-react';

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              🧱 ProjectBlox
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/browse" className="text-gray-600 hover:text-gray-900">Browse</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Project</h1>
          <p className="text-gray-600">Share your creative project with the community</p>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're working hard to build an amazing project submission system. 
            Soon you'll be able to share your creative projects with step-by-step guides, 
            materials lists, and beautiful photos.
          </p>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-4">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">Step-by-Step</h3>
              <p className="text-sm text-gray-600">Create detailed guides</p>
            </div>
            <div className="p-4">
              <Image className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">Photo Upload</h3>
              <p className="text-sm text-gray-600">Show your process</p>
            </div>
            <div className="p-4">
              <Settings className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">Materials List</h3>
              <p className="text-sm text-gray-600">Track what's needed</p>
            </div>
            <div className="p-4">
              <Upload className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">Easy Publish</h3>
              <p className="text-sm text-gray-600">Share with community</p>
            </div>
          </div>

          <Link
            href="/browse"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Existing Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
