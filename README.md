# ESPN Player Data Scraper - Chrome Extension

A Chrome extension to scrape player data from ESPN Cricinfo and save it to your fantasy cricket application database.

## 🚀 Features

- 🏏 Scrape player data directly from ESPN Cricinfo player pages
- ✅ Validates page before scraping
- 🔐 Secure authentication with admin token
- 🎨 Modern UI with React, TypeScript, and Tailwind CSS
- 📦 Optimized builds with Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Chrome browser
- Admin access token from your backend

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
cd espn-player-scrapper
npm install
```

### 2. Configure Backend URL

Create a `.env` file in the extension folder:

```bash
VITE_BACKEND_URL=http://localhost:8000
```

For production, update this to your production backend URL.

### 3. Development Mode

Run in watch mode for development:

```bash
npm run dev
```

This will build the extension and watch for changes.

### 4. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `espn-player-scrapper/dist` folder

## 🏗️ Production Build

Build the extension for production:

```bash
npm run build
```

The optimized extension will be in the `dist` folder.

## 📖 Usage

### 1. Configure Auth Token

1. Click the extension icon in Chrome
2. Expand the "⚙️ Settings" section
3. Enter your admin auth token
4. Click "Save Settings"

### 2. Scrape Player Data

1. Navigate to any ESPN Cricinfo player page (e.g., `https://www.espncricinfo.com/cricketers/virat-kohli-253802`)
2. Click the extension icon
3. If the page is valid, you'll see "Ready to scrape player data"
4. Click "Scrape Player Data"
5. The extension will scrape the data and send it to your backend

## 📁 Project Structure

```
espn-player-scrapper/
├── src/
│   ├── components/          # React components
│   │   ├── StatusMessage.tsx
│   │   ├── ScrapeButton.tsx
│   │   └── SettingsPanel.tsx
│   ├── types/               # TypeScript type definitions
│   │   └── player.ts
│   ├── utils/               # Utility functions
│   │   ├── api.ts          # Backend API calls
│   │   └── scraper.ts      # Chrome messaging
│   ├── App.tsx             # Main popup component
│   ├── main.tsx            # Entry point
│   ├── content.ts          # Content script (scraping logic)
│   ├── config.ts           # Configuration
│   ├── popup.html          # Popup HTML
│   └── index.css           # Tailwind styles
├── icons/                   # Extension icons
├── manifest.json           # Extension manifest
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## 🔧 Configuration

### Backend URL

Set in `.env` file:
```
VITE_BACKEND_URL=http://localhost:8000
```

### API Endpoint

Defined in `src/config.ts`:
```typescript
apiEndpoint: '/api/players/scrape-extension'
```

## 🐛 Troubleshooting

### Extension not loading content script

- Make sure you're on a valid ESPN Cricinfo player page
- Refresh the page after installing/updating the extension
- Check the console for errors

### "Failed to communicate with page"

- Refresh the ESPN page
- Ensure the content script is loaded (check Chrome DevTools)

### Authentication errors

- Verify your auth token is correct
- Check that your backend is running
- Ensure the backend URL in `.env` is correct

## 🔒 Security

- Auth token is stored securely in Chrome's `chrome.storage.sync`
- Backend URL is configured via environment variables, not exposed in UI
- All API calls use Bearer token authentication

## 📝 Scripts

- `npm run dev` - Development build with watch mode
- `npm run build` - Production build
- `npm run type-check` - TypeScript type checking

## 🤝 Contributing

1. Make changes to the source code
2. Test in development mode
3. Build for production
4. Test the built extension

## 📄 License

Part of the Cricket Fantasy App project.

