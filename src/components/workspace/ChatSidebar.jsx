import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ChatSidebar({ chatHistory }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full p-1.5 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      <div className="p-4">
        <h2 className={`text-lg font-semibold text-gray-900 dark:text-white mb-4 ${!isOpen && 'hidden'}`}>
          Chat History
        </h2>
        <div className="space-y-2">
          {chatHistory?.map((chat, index) => (
            <div
              key={index}
              className={`p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
                !isOpen && 'justify-center'
              }`}
            >
              {isOpen ? (
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                    {chat.text.substring(0, 30)}...
                  </span>
                </div>
              ) : (
                <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// PropTypes validation
ChatSidebar.propTypes = {
  chatHistory: PropTypes.array.isRequired, // Ensure chatHistory is an array
};
