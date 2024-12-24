// src/components/layout/Footer.jsx
//import React from 'react';
import { GitBranch } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <GitBranch className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">DiagramAI</span>
            </div>
            <p className="mt-4 text-gray-600">
              Transform text into professional diagrams instantly using AI. 
              Perfect for developers, architects, and technical teams.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">Examples</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">Tutorials</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">Support</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">GitHub</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-gray-900">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} DiagramAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;