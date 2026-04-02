# 🏗️ Архитектура проекта ГДЕТО

## 📁 Структура папок

```
gdeto/
├── frontend/                 # React приложение (Vite)
│   ├── src/
│   │   ├── components/      # Переиспользуемые компоненты
│   │   ├── pages/           # Страницы приложения
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context API (Auth, Favorites, Notifications)
│   │   ├── api/             # API клиент
│   │   ├── utils/           # Утилиты (форматеры, валидация, хранилище)
│   │   ├── constants/       # Конфигурация
│   │   ├── App.jsx          # Главный компонент
│   │   └── main.jsx         # Точка входа
│   ├── public/              # Статичные файлы (изображения, иконки)
│   ├── package.json         # Зависимости
│   ├── vite.config.js       # Конфиг Vite
│   ├── eslint.config.js     # ESLint конфиг
│   └── index.html           # HTML шаблон
│
├── backend/                 # Node.js + Express (в разработке)
│   ├── src/
│   │   ├── routes/          # API маршруты
│   │   ├── controllers/     # Обработчики запросов
│   │   ├── models/          # Модели данных
│   │   ├── middleware/      # Middleware
│   │   └── utils/           # Утилиты
│   ├── package.json
│   └── server.js            # Точка входа
│
├── docs/                    # Документация
│   ├── BACKEND_API_SPEC.md  # Полная спецификация API
│   ├── DEVELOPMENT_GUIDE.md # Архитектура и интеграция
│   ├── FRONTEND_SETUP.md    # Конфигурация фронтенда
│   ├── IMPLEMENTATION_CHECKLIST.md  # Чек-лист разработки
│   └── START_HERE.md        # Быстрый старт
│
├── README.md                # Основной README
└── .gitignore              # Git конфиг
```

## 🚀 Быстрый старт

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Откроется на `http://localhost:5173`

### Backend (планируется)

```bash
cd backend
npm install
npm start
```

Запустится на `http://localhost:3000`

## 🛠 Технологический стек

### Frontend
- **React 18** - UI библиотека
- **Vite** - Build tool
- **React Router v6** - Маршрутизация
- **React Hook Form** - Управление формами
- **Zod** - Валидация данных
- **Leaflet** - Карты
- **Context API** - State management
- **CSS Modules** - Стилизация

### Backend (требуется)
- **Node.js** - Runtime
- **Express** - Framework
- **MongoDB/PostgreSQL** - База данных
- **JWT** - Аутентификация
- **Multer** - Загрузка файлов

## 📚 Документация

- **START_HERE.md** - Начните отсюда 👈
- **BACKEND_API_SPEC.md** - Все endpoints и схемы
- **DEVELOPMENT_GUIDE.md** - Архитектура и паттерны
- **FRONTEND_SETUP.md** - Настройка окружения
- **IMPLEMENTATION_CHECKLIST.md** - Что нужно реализовать

## 🎨 Дизайн

- **Палитра**: Чёрный (#000) + серый (#F0F0F0)
- **Шрифт**: Inter
- **Стиль**: Минималистичный
- **Адаптивность**: Mobile-first

## 📊 Статус разработки

| Компонент | Статус |
|-----------|--------|
| Frontend | ✅ Готов |
| UI Компоненты | ✅ Готовы |
| Формы & Валидация | ✅ Готовы |
| Маршрутизация | ✅ Готова |
| Backend API | ⏳ В разработке |
| База данных | ⏳ Нужна |

---

**Версия**: 1.0.0  
**Последнее обновление**: 2 апреля 2025
