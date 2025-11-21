# Steelwool Africa CRM - Progressive Web App

A Progressive Web App (PWA) for lead generation and order management that works offline and can be installed on mobile and desktop devices.

## 📁 Project Structure

```
steelwool-crm/
├── index.html              # Main HTML file
├── app.js                  # Application JavaScript (see note below)
├── service-worker.js       # Service Worker for offline functionality
├── manifest.json           # PWA manifest
├── README.md              # This file
├── icons/                 # App icons (various sizes)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── screenshots/           # Screenshots for app stores (optional)
    ├── desktop.png
    └── mobile.png
```

## 🚀 Deployment on GitHub Pages

### Step 1: Create Icons

You need to create app icons in various sizes. Use any of these methods:

**Option A: Online Icon Generator**
1. Go to [https://www.pwabuilder.com/imageGenerator](https://www.pwabuilder.com/imageGenerator)
2. Upload a square image (recommended: 512x512px or larger)
3. Download the generated icon pack
4. Extract and place icons in the `icons/` folder

**Option B: Manual Creation**
Create PNG images with these dimensions:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

Recommended icon design:
- Simple, recognizable logo
- Solid background color (#667eea - purple gradient)
- White "SW" text or your company logo

### Step 2: Prepare Files

1. **Complete the app.js file** - The app.js is provided in two parts. Combine them into a single file.

2. **Update manifest.json** - Edit the `start_url` if your GitHub Pages URL is not at root:
   ```json
   "start_url": "/steelwool-crm/"  // If repo name is steelwool-crm
   ```

3. **Update service-worker.js** - Adjust the cache paths if needed:
   ```javascript
   const urlsToCache = [
     '/steelwool-crm/',           // Add repo name if not at root
     '/steelwool-crm/index.html',
     '/steelwool-crm/app.js',
     // ... etc
   ];
   ```

### Step 3: Deploy to GitHub

1. **Create a new GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Steelwool CRM PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/steelwool-crm.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Select **/ (root)** folder
   - Click **Save**
   - Your site will be published at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

3. **Wait 2-5 minutes** for GitHub to build and deploy your site

### Step 4: Configure Google Apps Script

1. **Deploy your Google Apps Script as a Web App:**
   - Open your Google Apps Script project
   - Click **Deploy** → **New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (or restrict as needed)
   - Click **Deploy**
   - Copy the **Web app URL** (ends with `/exec`)

2. **Connect PWA to Apps Script:**
   - Open your deployed PWA
   - Paste the Web app URL in the API Endpoint field
   - Click **Save & Connect**

## 📱 Installing the PWA

### On Android (Chrome/Edge):

1. Open the PWA URL in Chrome or Edge
2. Tap the menu (⋮) → **Install app** or **Add to Home Screen**
3. Confirm installation
4. App will appear on your home screen

### On iOS (Safari):

1. Open the PWA URL in Safari
2. Tap the Share button (□↑)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**
5. App will appear on your home screen

### On Desktop (Chrome/Edge):

1. Open the PWA URL
2. Look for the install icon in the address bar (+)
3. Click **Install**
4. App will be installed as a standalone application

## 🔧 Configuration

### API Endpoint Setup

On first launch, you'll need to configure the API endpoint:

1. Enter your Google Apps Script Web App URL
2. The URL should look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
3. Click **Save & Connect**
4. The endpoint is stored locally and persists across sessions

### Changing the API Endpoint

If you need to update the endpoint:
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Run: `localStorage.removeItem('steelwool_api_endpoint')`
4. Refresh the page
5. Enter the new endpoint

## ✨ Features

### Core Features
- ✅ Offline support with service worker
- ✅ Installable on mobile and desktop
- ✅ Sequential order validation
- ✅ Role-based access (Supervisor/Sales Rep)
- ✅ Real-time lead management
- ✅ Order tracking and reporting

### PWA Features
- 🔄 Auto-updates when online
- 💾 Local caching for fast load times
- 📱 Native app-like experience
- 🔔 Offline indicators
- 🎯 App shortcuts for quick actions

## 🛠️ Troubleshooting

### PWA Won't Install
- Ensure you're using HTTPS (GitHub Pages provides this automatically)
- Check that `manifest.json` is accessible
- Verify all icon paths are correct
- Clear browser cache and try again

### Service Worker Issues
- Open DevTools → Application → Service Workers
- Check for errors in the console
- Try **Unregister** and reload the page
- Verify `service-worker.js` is in the root directory

### API Connection Fails
- Verify the Apps Script Web App URL is correct
- Check that the Web App is deployed with "Anyone" access
- Ensure you're not blocking third-party cookies
- Check CORS settings in Apps Script

### Icons Not Showing
- Verify icon files exist in the `/icons/` directory
- Check file names match exactly what's in `manifest.json`
- Icons must be PNG format
- Clear cache and reload

## 🔒 Security Notes

1. **API Endpoint**: Store securely and never commit actual endpoint URLs to public repos
2. **Credentials**: All passwords are transmitted to Google Apps Script backend, not stored in PWA
3. **HTTPS**: Always use HTTPS in production (GitHub Pages provides this)
4. **Sensitive Data**: Consider implementing additional encryption for sensitive operations

## 📊 Testing Checklist

Before deploying to production:

- [ ] Test on Android Chrome
- [ ] Test on iOS Safari
- [ ] Test on Desktop Chrome/Edge
- [ ] Test offline functionality
- [ ] Test install/uninstall process
- [ ] Verify all API calls work
- [ ] Check sequential order validation
- [ ] Test role-based permissions
- [ ] Verify responsive design on all screen sizes
- [ ] Test with slow 3G network simulation

## 🆙 Updates and Maintenance

### Updating the PWA

1. Make changes to your files
2. Update version in `service-worker.js`:
   ```javascript
   const CACHE_NAME = 'steelwool-crm-v2'; // Increment version
   ```
3. Commit and push to GitHub
4. Users will automatically get updates when they open the app online

### Analytics (Optional)

To track usage, add Google Analytics:
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📝 License

Copyright © 2024 Steelwool Africa LTD. All rights reserved.

## 🤝 Support

For issues or questions, please contact your system administrator or create an issue in the GitHub repository.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Compatible With**: Google Apps Script API v1