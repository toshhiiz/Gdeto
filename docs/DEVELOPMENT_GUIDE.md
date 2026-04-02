# Frontend Development & Backend Integration Guide

## Frontend Architecture Overview

### Directory Structure

```
src/
├── App.jsx                 # Main app component with routing
├── App.css                 # Global styles (minimalistic design)
├── main.jsx               # React entry point
├── api/
│   └── client.js          # API client with fetch wrapper
├── components/
│   ├── UI/                # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Select.jsx
│   │   ├── Alert.jsx
│   │   └── Skeleton.jsx
│   ├── ErrorBoundary.jsx
│   ├── Filter.jsx         # Search & filter component
│   └── PropertyCard.jsx   # Property listing component
├── pages/
│   ├── HomePage.jsx       # Main page with properties list
│   ├── PropertyPage.jsx   # Single property details
│   ├── Login.jsx          # Auth page
│   ├── AddProperty.jsx    # Create/edit property
│   └── NotFound.jsx       # 404 page
├── hooks/                 # Custom React hooks
│   ├── useAsync.js        # Async operations
│   ├── useFetch.js        # Data fetching
│   ├── useForm.js         # Form state
│   └── usePagination.js  # Pagination logic
├── context/               # React Context providers
│   ├── AuthContext.jsx    # Authentication
│   ├── FavoritesContext.jsx # Favorites management
│   └── NotificationContext.jsx # Toasts/notifications
├── utils/
│   ├── formatters.js      # String/number formatting
│   ├── storage.js         # LocalStorage helpers
│   └── validation.js      # Zod schemas
├── constants/
│   └── config.js          # App constants & API config
└── data.jsx              # Mock data for development
```

## Key Concepts

### 1. Context API for State Management

**AuthContext** - Manages user login/registration
- `login(email, password)` - Authenticate user
- `register(name, email, password)` - Create account
- `logout()` - Clear session
- `isLoading` - Loading state
- `user` - Current user data

**FavoritesContext** - Manages user's favorite properties
- `isFavorite(propertyId)` - Check if property is favorited
- `toggleFavorite(propertyId)` - Add/remove from favorites
- `favorites` - Array of favorited property IDs

**NotificationContext** - Shows toast messages
- `showSuccess(message)` - Green notification
- `showError(message)` - Red notification
- `showInfo(message)` - Blue notification
- `showWarning(message)` - Yellow notification

### 2. Custom Hooks

**useAsync** - Generic async handler
```javascript
const { execute, status, data, error } = useAsync(async (data) => {
  // Make API call
  return result;
});

await execute(data);
```

**useFetch** - Auto-fetch data on component mount
```javascript
const { data, isLoading, error } = useFetch('/properties');
```

**useForm** - Form state management (uses React Hook Form)
```javascript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
```

**usePagination** - Handle pagination
```javascript
const { 
  items, 
  currentPage, 
  nextPage, 
  prevPage, 
  goToPage 
} = usePagination(allItems, 10);
```

### 3. API Client (`api/client.js`)

The API client handles:
- Request construction
- JWT token injection
- Error handling
- JSON serialization

```javascript
// Usage example
import { propertiesApi } from '../api/client';

const properties = await propertiesApi.getAll();
const property = await propertiesApi.getById(1);
const created = await propertiesApi.create(data);
```

### 4. Validation Schemas (Zod)

All forms use Zod for runtime validation:

```javascript
import { z } from 'zod';

const propertySchema = z.object({
  title: z.string().min(3),
  price: z.number().min(1000),
  area: z.number().min(10)
});

const data = propertySchema.parse(formData); // Throws if invalid
```

## Component Patterns

### Stateless Components (Presentation)

```javascript
export const PropertyCard = ({ property, onFavorite }) => {
  return (
    <div className="compact-card">
      {/* Render UI */}
    </div>
  );
};
```

### Container Components (Smart)

```javascript
const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      {isLoading ? <Skeleton /> : <PropertyCard {...} />}
    </div>
  );
};
```

## Styling System

### CSS Variables (in App.css)

```css
:root {
  --primary: #000;
  --primary-hover: #333;
  --accent: #F0F0F0;
  --bg-color: #FAFAFA;
  --text-main: #1a1a1a;
  --text-muted: #666;
  --border-color: #E5E5E5;
  --success: #16A34A;
  --error: #DC2626;
  --warning: #D97706;
}
```

### Minimalist Design Principles

1. **No Shadows** - Clean borders instead
2. **Simple Colors** - Black, white, gray only
3. **Clear Typography** - Use weight for hierarchy
4. **Subtle Interactions** - No flashy animations
5. **Consistent Spacing** - 8px grid system

### Responsive Design

```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## Backend Integration Points

### 1. Authentication Flow

```javascript
// Frontend -> Backend
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Backend Response
{
  "success": true,
  "token": "jwt_token",
  "user": { "id", "name", "email" }
}

// Frontend stores token in localStorage
localStorage.setItem('gdeto_token', token);

// Token included in all subsequent requests
// Authorization: Bearer {token}
```

### 2. Property Search

```javascript
// Frontend filters
const params = new URLSearchParams({
  dealType: 'Аренда',
  city: 'Астана',
  priceFrom: 100000,
  priceTo: 200000
});

// Backend returns filtered results with pagination
GET /api/properties?dealType=Аренда&city=Астана&page=1&limit=10
```

### 3. Image Upload

```javascript
// Frontend creates form data
const formData = new FormData();
formData.append('file', fileInput.files[0]);

// Backend returns URL
POST /api/upload
Response: { "url": "https://cdn.../image.jpg" }
```

## Backend Implementation Checklist

### Phase 1: Setup
- [ ] Create Express server
- [ ] Setup MongoDB/PostgreSQL
- [ ] Configure environment variables
- [ ] Setup CORS and middleware

### Phase 2: Authentication
- [ ] POST `/auth/register` endpoint
- [ ] POST `/auth/login` endpoint
- [ ] JWT token generation
- [ ] Token validation middleware
- [ ] POST `/auth/logout` endpoint (optional)

### Phase 3: Properties CRUD
- [ ] GET `/properties` with filters & pagination
- [ ] GET `/properties/:id`
- [ ] POST `/properties` (create)
- [ ] PUT `/properties/:id` (update)
- [ ] DELETE `/properties/:id` (delete)

### Phase 4: Favorites
- [ ] GET `/favorites`
- [ ] POST `/favorites/:id`
- [ ] DELETE `/favorites/:id`

### Phase 5: File Upload
- [ ] POST `/upload` endpoint
- [ ] Store files (S3, local, Cloudinary, etc.)
- [ ] Return public URLs

### Phase 6: Optimization
- [ ] Add database indexes
- [ ] Implement caching
- [ ] Rate limiting
- [ ] Error logging

## Development Workflow

### Running Both Frontend & Backend

```bash
# Terminal 1 - Frontend
cd gdeto-frontend
npm run dev
# Runs on http://localhost:5173

# Terminal 2 - Backend
npm start
# Runs on http://localhost:3000
```

### Environment Configuration

Frontend (`vite.config.js`):
```javascript
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

Backend (`.env`):
```env
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000
```

## Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Enable CORS in backend
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: 401 Unauthorized
**Solution**: Token not being sent or expired
```javascript
// Check if token exists
const token = localStorage.getItem('gdeto_token');
// Check token expiration
// Refresh token implementation
```

### Issue: Image Upload Fails
**Solution**: Check file size limit and CORS
```javascript
// Increase limit in backend
app.use(express.json({ limit: '10mb' }));
```

### Issue: Slow Database Queries
**Solution**: Add indexes to frequently queried fields
```javascript
db.properties.createIndex({ city: 1, dealType: 1 });
```

## Testing Strategy

### Manual Testing
1. Register new user
2. Create property listing
3. Filter by various criteria
4. Add to favorites
5. Update profile
6. Delete property

### Automated Testing (Optional)
```bash
npm install jest supertest

# Run tests
npm test
```

## Deployment

### Frontend
```bash
npm run build
# Deploy 'dist' folder to Vercel, Netlify, or your hosting
```

### Backend
```bash
# Deploy to Heroku, Railway, DigitalOcean, AWS, etc.
# Ensure environment variables are set
PORT=3000
NODE_ENV=production
MONGODB_URI=... (production database)
```

## Performance Tips

1. **Lazy Load Images**
   ```javascript
   <img loading="lazy" src={url} />
   ```

2. **Memoize Components**
   ```javascript
   export default memo(PropertyCard);
   ```

3. **Pagination** - Load 10 items per page
4. **Skeleton Loading** - Show placeholders
5. **Database Indexes** - Speed up queries

## Security Best Practices

1. **Never Store Sensitive Data in LocalStorage**
   - Use httpOnly cookies for tokens (if possible)
   - Clear on logout

2. **Validate All Input**
   - Server-side validation required
   - Zod schemas for frontend

3. **Sanitize User Input**
   - Prevent XSS attacks
   - Use DOMPurify if needed

4. **HTTPS Only**
   - Ensure production uses HTTPS
   - Set Secure flag on cookies

5. **Rate Limiting**
   - Prevent brute force attacks
   - Limit API requests

## Helpful Commands

```bash
# Frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint

# Backend (when created)
npm install        # Install dependencies
npm start          # Start server
npm run dev        # Start with nodemon
```

## Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Validation](https://zod.dev)
- [Express.js](https://expressjs.com)
- [MongoDB](https://mongodb.com)
- [JWT](https://jwt.io)

---

**Status**: Frontend ✅ | Backend ⏳ (Ready to implement with BACKEND_API_SPEC.md)
