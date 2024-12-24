import { Link, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { GitBranch, LogOut } from 'lucide-react';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (location.pathname === '/workspace') {
    return null;
  }

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <GitBranch className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold">DiagramAI</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/workspace"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Workspace
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.object, // Adjust this type based on actual usage
};

export default Navbar;