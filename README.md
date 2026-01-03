# Bookmarks in New Tab

A beautiful Chrome extension that displays your bookmarks in a Notion-style interface when opening a new tab. Built with React, Vite, and TailwindCSS.

## Features

- 📚 **Folder-based Display**: Choose which bookmark folder to display (includes all subfolders)
- 🎨 **Auto Theme**: Automatically switches between light and dark themes based on your system preferences
- 📐 **Adjustable Width**: Choose between 50%, 80%, or 100% display width
- 🔖 **Favicon Support**: Shows favicon for each bookmark
- 💾 **Persistent Settings**: Your preferences are saved using Chrome's storage API
- ✨ **Notion-style UI**: Clean, minimalist design without extra clutter

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/zhengxinzx/bookmark-in-new-tab.git
   cd bookmark-in-new-tab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the `dist` folder from this project

## Usage

1. After installation, open a new tab in Chrome
2. Click the "Settings" button in the top right corner
3. Select which bookmark folder you want to display
4. Choose your preferred display width (50%, 80%, or 100%)
5. Click "Save Settings"
6. Your bookmarks will be displayed in a beautiful grid layout!

## Development

To run the extension in development mode:

```bash
npm run dev
```

This will start a development server. To test changes:
1. Make your changes
2. Build the extension: `npm run build`
3. Reload the extension in Chrome (chrome://extensions/)
4. Open a new tab to see your changes

## Technologies Used

- **React**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Styling
- **Chrome Extensions API**: Bookmarks and storage access

## License

ISC

