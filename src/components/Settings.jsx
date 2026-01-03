import React, { useState } from 'react';

function Settings({ allFolders, selectedFolder, displayWidth, onSave }) {
  const [tempFolder, setTempFolder] = useState(selectedFolder);
  const [tempWidth, setTempWidth] = useState(displayWidth);

  const handleSave = () => {
    onSave(tempFolder, tempWidth);
  };

  return (
    <div className="mb-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-6">
        Settings
      </h2>

      <div className="space-y-6">
        {/* Folder Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bookmark Folder
          </label>
          <select
            value={tempFolder}
            onChange={(e) => setTempFolder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            {allFolders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.title}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Select which folder to display bookmarks from (includes all subfolders)
          </p>
        </div>

        {/* Width Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Width
          </label>
          <div className="flex gap-3">
            {['50%', '80%', '100%'].map((width) => (
              <button
                key={width}
                onClick={() => setTempWidth(width)}
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  tempWidth === width
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                {width}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Choose how wide the bookmarks should be displayed
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
