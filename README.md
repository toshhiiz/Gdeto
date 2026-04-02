# 🏠 ГДЕТО - Казахстанский маркетплейс недвижимости

Современное веб-приложение для поиска, размещения и управления объявлениями о недвижимости в Казахстане.

## ✨ Особенности

✅ **Frontend готов к продакшену** - Минималистичный дизайн, все компоненты  
✅ **Быстрый поиск и фильтрация** - Гибкая система фильтров  
✅ **Управление объявлениями** - Создание, редактирование, удаление  
✅ **Система избранного** - Сохраняйте понравившиеся объявления  
✅ **Адаптивный дизайн** - Работает на всех устройствах  
✅ **Полная документация** - Готов к интеграции бэкенда  

## 🚀 Быстрый старт

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Откроется на: `http://localhost:5173`

### Backend

```bash
cd backend
npm install
npm start
```

Запустится на: `http://localhost:3000`

**Полная документация**: см. `docs/START_HERE.md`

## 📁 Структура

```
gdeto/
├── frontend/            # React приложение
│   ├── src/
│   │   ├── components/  # UI компоненты
│   │   ├── pages/       # Страницы
│   │   ├── hooks/       # Custom hooks
│   │   ├── context/     # Global state
│   │   ├── api/         # API client
│   │   └── utils/       # Утилиты
│   └── package.json
│
├── backend/             # Node.js API (планируется)
│
├── docs/                # Документация
│   ├── BACKEND_API_SPEC.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── FRONTEND_SETUP.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   └── START_HERE.md
│
├── ARCHITECTURE.md      # Описание архитектуры
└── README.md
```

## 🎨 Дизайн

- **Цвет**: Чёрный (#000) + светло-серый (#F0F0F0)
- **Шрифт**: Inter - современный sans-serif
- **Стиль**: Минималистичный, без лишних теней
- **Адаптивность**: Mobile-first подход

## 📚 Документация

1. **docs/START_HERE.md** - 👈 Начните отсюда
2. **docs/BACKEND_API_SPEC.md** - Полная спецификация API
3. **docs/DEVELOPMENT_GUIDE.md** - Архитектура проекта
4. **docs/IMPLEMENTATION_CHECKLIST.md** - Чек-лист разработки
5. **docs/FRONTEND_SETUP.md** - Конфигурация
6. **ARCHITECTURE.md** - Структура проекта

## 🛠 Технологический стек

### Frontend
- React 18
- React Router v6
- React Hook Form
- Zod (валидация)
- Vite
- Leaflet (карты)
- React Toastify

### Backend (требуется)
- Node.js + Express
- MongoDB или PostgreSQL
- JWT (аутентификация)
- Multer (загрузка файлов)

## 📋 API Endpoints

Все эндпоинты описаны в `BACKEND_API_SPEC.md`:

- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход
- `GET /properties` - Список объявлений  
- `GET /properties/:id` - Одно объявление
- `POST /properties` - Создание
- `PUT /properties/:id` - Редактирование
- `DELETE /properties/:id` - Удаление
- `GET/POST/DELETE /favorites` - Избранное
- `POST /upload` - Загрузка фото

## ✅ Статус проекта

| Компонент | Статус |
|-----------|--------|
| Frontend | ✅ Готов |
| Дизайн | ✅ Готов |
| UI Компоненты | ✅ Готов |
| Формы & Валидация | ✅ Готов |
| Маршрутизация | ✅ Готов |
| Backend API | ⏳ Нужен |
| База данных | ⏳ Нужна |
| Аутентификация | ⏳ На бэкенде |

## 🔧 Конфигурация

Создайте `gdeto-frontend/.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📝 Лицензия

Закрытый проект

## 👤 Автор

ГДЕТО - Проект недвижимости Казахстана

---

**Версия**: 1.0.0  
**Дата**: 2 апреля 2025  
**Статус**: Frontend готов, Backend в разработке 🚀