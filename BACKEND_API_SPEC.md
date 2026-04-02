# ГДЕТО API Specification

## Backend Setup

### Prerequisites
- Node.js 18+
- Express.js или аналогичный фреймворк
- MongoDB или PostgreSQL
- JWT для аутентификации

---

## API Endpoints

### Authentication (`/api/auth`)

#### POST `/auth/register`
**Регистрация пользователя**

```json
Request:
{
  "name": "Иван Иванов",
  "email": "ivan@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  }
}

Error (400):
{
  "success": false,
  "error": "Email already exists"
}
```

#### POST `/auth/login`
**Вход пользователя**

```json
Request:
{
  "email": "ivan@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  }
}

Error (401):
{
  "success": false,
  "error": "Invalid credentials"
}
```

#### POST `/auth/logout`
**Выход пользователя**

```json
Request:
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Properties (`/api/properties`)

#### GET `/properties`
**Получить все объявления с фильтрацией**

Query Parameters:
- `dealType`: "Аренда" | "Продажа"
- `city`: string (город)
- `propertyType`: "Квартира" | "Дом" | "Офис"
- `rooms`: string | number
- `priceFrom`: number
- `priceTo`: number
- `areaFrom`: number
- `areaTo`: number
- `floorFrom`: number
- `floorTo`: number
- `furnished`: "Да" | "Нет"
- `withPets`: boolean
- `withKids`: boolean
- `fromOwner`: boolean (только от хозяев)
- `page`: number (по умолчанию 1)
- `limit`: number (по умолчанию 10)
- `sort`: "new" | "cheap" | "expensive"

```json
Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "dealType": "Аренда",
      "rentPeriod": "Помесячно",
      "propertyType": "Квартира",
      "rooms": 2,
      "area": 65,
      "price": 150000,
      "city": "Астана",
      "address": "ул. Республики, 45",
      "description": "На 10 этаже, светлая квартира",
      "images": ["url1", "url2", "url3"],
      "floor": 10,
      "totalFloors": 15,
      "furnished": "Да",
      "complex": "Жилой комплекс Премиум",
      "withPets": true,
      "withKids": true,
      "authorType": "Хозяин",
      "authorId": "user_id_123",
      "authorName": "Александр",
      "authorPhone": "+7 700 123 4567",
      "photoCount": 5,
      "date": "2 апреля 2026",
      "createdAt": "2026-04-02T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "pages": 15
  }
}
```

#### GET `/properties/:id`
**Получить одно объявление по ID**

```json
Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "dealType": "Аренда",
    "rentPeriod": "Помесячно",
    "propertyType": "Квартира",
    "rooms": 2,
    "area": 65,
    "price": 150000,
    "city": "Астана",
    "address": "ул. Республики, 45",
    "description": "На 10 этаже, светлая квартира",
    "images": ["url1", "url2", "url3"],
    "floor": 10,
    "totalFloors": 15,
    "furnished": "Да",
    "complex": "Жилой комплекс Премиум",
    "withPets": true,
    "withKids": true,
    "authorType": "Хозяин",
    "authorId": "user_id_123",
    "authorName": "Александр",
    "authorPhone": "+7 700 123 4567",
    "photoCount": 5,
    "date": "2 апреля 2026",
    "createdAt": "2026-04-02T10:30:00Z"
  }
}

Error (404):
{
  "success": false,
  "error": "Property not found"
}
```

#### POST `/properties`
**Создать новое объявление**

```json
Request:
Headers: Authorization: Bearer {token}
{
  "dealType": "Аренда",
  "rentPeriod": "Помесячно",
  "propertyType": "Квартира",
  "rooms": 2,
  "area": 65,
  "price": 150000,
  "city": "Астана",
  "address": "ул. Республики, 45",
  "description": "Светлая квартира на 10 этаже",
  "images": ["url1", "url2"],
  "floor": 10,
  "totalFloors": 15,
  "furnished": "Да",
  "complex": "Жилой комплекс Премиум",
  "withPets": true,
  "withKids": true
}

Response (201):
{
  "success": true,
  "data": {
    "id": 124,
    ...property_data...
  }
}

Error (401):
{
  "success": false,
  "error": "Unauthorized"
}

Error (400):
{
  "success": false,
  "error": "Validation error",
  "details": {...}
}
```

#### PUT `/properties/:id`
**Обновить объявление**

```json
Request:
Headers: Authorization: Bearer {token}
{
  "price": 160000,
  "description": "Обновленное описание"
}

Response (200):
{
  "success": true,
  "data": {...updated_property...}
}

Error (403):
{
  "success": false,
  "error": "Forbidden - only author can update"
}
```

#### DELETE `/properties/:id`
**Удалить объявление**

```json
Request:
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Property deleted successfully"
}

Error (403):
{
  "success": false,
  "error": "Forbidden - only author can delete"
}
```

---

### Favorites (`/api/favorites`)

#### GET `/favorites`
**Получить избранные объявления текущего пользователя**

```json
Request:
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    { id: 1, ... },
    { id: 5, ... }
  ]
}
```

#### POST `/favorites/:propertyId`
**Добавить в избранное**

```json
Request:
Headers: Authorization: Bearer {token}

Response (201):
{
  "success": true,
  "message": "Added to favorites"
}

Error (400):
{
  "success": false,
  "error": "Already in favorites"
}
```

#### DELETE `/favorites/:propertyId`
**Удалить из избранного**

```json
Request:
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Removed from favorites"
}
```

---

### Upload (`/api/upload`)

#### POST `/upload`
**Загрузка изображений**

```
Request:
Headers: 
  Authorization: Bearer {token}
  Content-Type: multipart/form-data

Form Data:
  file: {File}

Response (200):
{
  "success": true,
  "url": "https://cdn.example.com/images/uuid.jpg"
}

Error (413):
{
  "success": false,
  "error": "File too large"
}
```

---

## Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "phone": String (optional),
  "avatar": String (optional),
  "favorites": [ObjectId],
  "createdAt": Date,
  "updatedAt": Date
}
```

### Properties Collection
```json
{
  "_id": ObjectId,
  "dealType": String ("Аренда" | "Продажа"),
  "rentPeriod": String ("Помесячно" | "Посуточно"),
  "propertyType": String,
  "rooms": Number,
  "area": Number,
  "price": Number,
  "city": String,
  "address": String,
  "complex": String (optional),
  "description": String,
  "images": [String],
  "floor": Number,
  "totalFloors": Number,
  "furnished": String ("Да" | "Нет"),
  "withPets": Boolean,
  "withKids": Boolean,
  "authorId": ObjectId,
  "authorType": String ("Хозяин" | "Агентство"),
  "createdAt": Date,
  "updatedAt": Date
}
```

### Favorites Collection
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "propertyId": ObjectId,
  "createdAt": Date
}
```

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

### Common Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 413: Payload Too Large
- 500: Internal Server Error

---

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer {jwt_token}
```

Token should contain:
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234571490
}
```

---

## Rate Limiting

- 100 requests per minute for unauthenticated users
- 1000 requests per minute for authenticated users

---

## CORS

Enable CORS for frontend:
```
Allow-Origin: http://localhost:5173
Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Allow-Headers: Content-Type, Authorization
```

---

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/gdeto
JWT_SECRET=your_secret_key_here
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880 (5MB)
```
