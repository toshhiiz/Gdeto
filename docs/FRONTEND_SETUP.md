# Frontend Setup & Configuration

## 🚀 Quick Start

```bash
cd gdeto-frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

## 🌐 Environment Variables

Create file: `gdeto-frontend/.env.local`

```env
# Backend API URL (optional - uses mock data if not set)
VITE_API_URL=http://localhost:3000/api
```

## 📦 Dependencies

All dependencies are in `package.json`. Main packages:

- **React 18** - UI library
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Zod** - Validation
- **Leaflet** - Maps
- **React Toastify** - Notifications
- **Vite** - Build tool

## 🔧 Scripts

```bash
npm run dev      # Start development server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code style
```

## 📂 Project Structure

```
src/
├── components/UI/     # Reusable components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── context/          # Global state
├── api/              # API client
├── utils/            # Utilities
├── constants/        # App config
└── App.jsx          # Main component
```

## 🎯 Features Working Now

✅ User authentication UI
✅ Property search & filter
✅ Property listing with pagination
✅ Detailed property page
✅ Add new property form
✅ Favorites management
✅ Responsive design
✅ Error handling
✅ Loading states

## ⏳ Ready for Backend

All UI is complete. Just needs:
1. Backend API implementation (see BACKEND_API_SPEC.md)
2. Set VITE_API_URL to your backend
3. Done!

## 🔗 API Integration

When backend is ready:

1. **Update environment**
   ```env
   VITE_API_URL=http://your-backend.com/api
   ```

2. **API calls work automatically**
   - Authentication
   - Property CRUD
   - Favorites
   - Image upload

## 💡 Without Backend

Frontend works with mock data (`src/data.jsx`). Perfect for:
- UI development
- Testing components
- Design iterations

## 🐛 Troubleshooting

**Port 5173 already in use?**
```bash
# Kill the process
npx kill-port 5173
```

**Dependencies won't install?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS errors?**
- Configure VITE_API_URL
- Backend must have CORS enabled

---

**Frontend Status**: ✅ Complete & Ready
**Backend Status**: ⏳ Implement using BACKEND_API_SPEC.md
