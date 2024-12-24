import { ArrowRight, Database, FileText, GitBranch, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <GitBranch className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">DiagramAI</span>
            </div>
            <div className="flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
                How it Works
              </a>
              <button
                onClick={() => navigate('/signup')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Text into Professional Diagrams
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Generate UML, Sequence, and Architecture diagrams instantly using AI.
            Perfect for developers, architects, and technical teams.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/workspace')} // Example for navigation
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              Try Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
              View Examples
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Diagram Types</h3>
            <p className="text-gray-600">
              Generate UML, Sequence, Class, and Architecture diagrams from text descriptions.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
            <MessageSquare className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chat Interface</h3>
            <p className="text-gray-600">
              Interactive chat interface with diagram editing and conversation history.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
            <Database className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cloud Storage</h3>
            <p className="text-gray-600">
              Securely store and manage your diagrams with Firebase integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
