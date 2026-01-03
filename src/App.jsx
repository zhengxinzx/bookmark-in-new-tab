import React, { useState, useEffect } from 'react';
import BookmarkGrid from './components/BookmarkGrid';
import Settings from './components/Settings';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('0');
  const [displayWidth, setDisplayWidth] = useState('80%');
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Check for dark mode preference
  useEffect(() => {
    const checkDarkMode = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    checkDarkMode();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load settings from Chrome storage
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.get(['selectedFolder', 'displayWidth'], (result) => {
        if (result.selectedFolder) {
          setSelectedFolder(result.selectedFolder);
        }
        if (result.displayWidth) {
          setDisplayWidth(result.displayWidth);
        }
      });
    }
  }, []);

  // Load bookmarks
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.bookmarks) {
      chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        // Extract all folders for settings
        const folders = [];
        const extractFolders = (nodes) => {
          nodes.forEach((node) => {
            if (node.children) {
              folders.push({ id: node.id, title: node.title || 'Bookmarks' });
              extractFolders(node.children);
            }
          });
        };
        extractFolders(bookmarkTreeNodes);
        setAllFolders(folders);

        // Get bookmarks from selected folder
        if (selectedFolder) {
          chrome.bookmarks.getSubTree(selectedFolder, (results) => {
            if (results && results.length > 0) {
              const allBookmarks = [];
              const extractBookmarks = (nodes) => {
                nodes.forEach((node) => {
                  if (node.url) {
                    allBookmarks.push(node);
                  }
                  if (node.children) {
                    extractBookmarks(node.children);
                  }
                });
              };
              extractBookmarks(results);
              setBookmarks(allBookmarks);
            }
          });
        }
      });
    }
  }, [selectedFolder]);

  const handleSettingsSave = (folder, width) => {
    setSelectedFolder(folder);
    setDisplayWidth(width);
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({
        selectedFolder: folder,
        displayWidth: width
      });
    }
    
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8" style={{ maxWidth: displayWidth }}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-gray-800 dark:text-gray-100">
            Bookmarks
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            {showSettings ? 'Close Settings' : 'Settings'}
          </button>
        </div>

        {showSettings && (
          <Settings
            allFolders={allFolders}
            selectedFolder={selectedFolder}
            displayWidth={displayWidth}
            onSave={handleSettingsSave}
          />
        )}

        <BookmarkGrid bookmarks={bookmarks} />
      </div>
    </div>
  );
}

export default App;
