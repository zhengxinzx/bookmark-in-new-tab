import React from 'react';

function BookmarkGrid({ bookmarks }) {
  const getFaviconUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
    } catch {
      return null;
    }
  };

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No bookmarks found in the selected folder
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {bookmarks.map((bookmark) => (
        <a
          key={bookmark.id}
          href={bookmark.url}
          className="group flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-800/50 transition-all duration-200 bg-white dark:bg-gray-800"
        >
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {getFaviconUrl(bookmark.url) ? (
              <img
                src={getFaviconUrl(bookmark.url)}
                alt=""
                className="w-6 h-6"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs font-medium"
              style={{ display: 'none' }}
            >
              {bookmark.title ? bookmark.title.charAt(0).toUpperCase() : '?'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {bookmark.title || 'Untitled'}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default BookmarkGrid;
