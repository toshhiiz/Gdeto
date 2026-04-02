import { z } from 'zod';

// Email validation
export const emailSchema = z
  .string()
  .email('Введите корректный email')
  .min(1, 'Email обязателен');

// Password validation
export const passwordSchema = z
  .string()
  .min(6, 'Пароль минимум 6 символов')
  .min(1, 'Пароль обязателен');

// Name validation
export const nameSchema = z
  .string()
  .min(2, 'Имя минимум 2 символа')
  .max(50, 'Имя максимум 50 символов')
  .min(1, 'Имя обязательно');

// Phone validation
export const phoneSchema = z
  .string()
  .regex(/^(\+7|7|8)?[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})$/, 'Введите корректный номер');

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

// Register schema
export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

// Add property schema
export const addPropertySchema = z.object({
  dealType: z.string().min(1, 'Выберите тип сделки'),
  propertyType: z.string().min(1, 'Выберите тип недвижимости'),
  rooms: z.number().min(1, 'Минимум 1 комната').max(20, 'Максимум 20 комнат'),
  area: z.number().min(10, 'Площадь минимум 10 м²').max(10000, 'Площадь максимум 10000 м²'),
  price: z.number().min(1000, 'Цена минимум 1000 ₸').max(999999999, 'Цена максимум 999999999 ₸'),
  city: z.string().min(1, 'Выберите город'),
  address: z.string().min(3, 'Адрес минимум 3 символа').max(255, 'Адрес максимум 255 символов'),
  description: z.string().min(10, 'Описание минимум 10 символов').max(2000, 'Описание максимум 2000 символов'),
  furnished: z.string().optional(),
  rentPeriod: z.string().optional(),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  sellerName: z.string().min(2, 'Имя минимум 2 символа').max(100, 'Имя максимум 100 символов').optional().or(z.literal('')),
  phone: z.string().min(6, 'Введите корректный номер').optional().or(z.literal('')),
  email: z.string().email('Введите корректный email').optional().or(z.literal(''))
});

// Filter values validation
export const filterSchema = z.object({
  dealType: z.string(),
  rentPeriod: z.string().optional(),
  city: z.string(),
  propertyType: z.string(),
  rooms: z.string(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  searchText: z.string().optional()
});
