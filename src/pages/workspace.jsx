import { useState, useEffect, useRef } from 'react';
import { auth, db } from '../services/firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import mermaid from 'mermaid';
import { Send, Edit2, Download, Copy, RefreshCw } from 'lucide-react';
//import WorkspaceHeader from './WorkspaceHeader';
import ChatSidebar from '../components/workspace/ChatSidebar';
import WorkspaceHeader from "../components/workspace/WorkspaceHeader"; // Adjust path accordingly


const Workspace = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mermaidCode, setMermaidCode] = useState('');
  const [editMode, setEditMode] = useState(false);
  const chatContainerRef = useRef(null);
  const diagramContainerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(
          collection(db, `chats/${auth.currentUser.uid}/messages`),
          orderBy('timestamp', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const loadedMessages = [];
        querySnapshot.forEach((doc) => {
          loadedMessages.unshift(doc.data());
        });
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    };

    loadChatHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const messageData = {
        text: newMessage,
        timestamp: new Date(),
        sender: 'user',
      };

      await addDoc(
        collection(db, `chats/${auth.currentUser.uid}/messages`),
        messageData
      );

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      const mockMermaidCode = `
        graph TD
          A[Client] --> B[Load Balancer]
          B --> C[Server1]
          B --> D[Server2]
      `;

      const responseData = {
        text: "Here's your diagram based on the description:",
        timestamp: new Date(),
        sender: 'bot',
        diagram: mockMermaidCode
      };

      await addDoc(
        collection(db, `chats/${auth.currentUser.uid}/messages`),
        responseData
      );

      setMessages(prev => [...prev, responseData]);
      setMermaidCode(mockMermaidCode);
      renderDiagram(mockMermaidCode);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderDiagram = (code) => {
    if (diagramContainerRef.current) {
      try {
        mermaid.render('diagram', code.trim(), (svgCode) => {
          diagramContainerRef.current.innerHTML = svgCode;
        });
      } catch (error) {
        console.error('Error rendering diagram:', error);
      }
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleSaveEdit = () => {
    setEditMode(false);
    renderDiagram(mermaidCode);
  };

  const handleDownload = () => {
    const svgData = diagramContainerRef.current.innerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => navigator.clipboard.writeText(mermaidCode);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
  <WorkspaceHeader />
  <ChatSidebar chatHistory={messages} />
  
  {/* Main content area with proper spacing */}
  <main className="ml-16 lg:ml-64 pt-16 h-[calc(100vh-4rem)]">
    <div className="h-full p-4 sm:p-6 lg:p-8">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat</h2>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3.5 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Describe your diagram..."
                className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Diagram Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Diagram</h2>
            <div className="flex space-x-2">
              {mermaidCode && (
                <>
                  <button 
                    onClick={handleEdit} 
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Edit diagram"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleDownload} 
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Download SVG"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleCopyCode} 
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="Copy code"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {editMode ? (
              <div className="h-full flex flex-col">
                <textarea
                  value={mermaidCode}
                  onChange={(e) => setMermaidCode(e.target.value)}
                  className="flex-1 p-4 font-mono text-sm border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700"
                />
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div ref={diagramContainerRef} className="w-full h-full flex items-center justify-center">
                {!mermaidCode && (
                  <div className="text-gray-500 dark:text-gray-400 text-center">
                    Start a chat to generate a diagram
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
  );
};

export default Workspace;