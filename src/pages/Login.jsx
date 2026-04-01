import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '../utils/validation';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { Alert } from '../components/UI/Alert';
import { TOAST_MESSAGES } from '../constants/config';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  const { showSuccess, showError } = useNotification();

  const { 
    register: registerField, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await login(data.email, data.password);
        showSuccess(TOAST_MESSAGES.SUCCESS_LOGIN);
      } else {
        await register(data.name, data.email, data.password);
        showSuccess(TOAST_MESSAGES.SUCCESS_REGISTER);
      }
      reset();
      navigate('/');
    } catch (error) {
      showError(error.message || TOAST_MESSAGES.ERROR_AUTH);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? 'Вход в личный кабинет' : 'Регистрация'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {/* Name field - only for registration */}
          {!isLogin && (
            <Input
              label="Имя"
              placeholder="Иван Иванов"
              type="text"
              error={errors.name?.message}
              {...registerField('name')}
              required
            />
          )}
          
          {/* Email field */}
          <Input
            label="Email"
            placeholder="example@mail.com"
            type="email"
            error={errors.email?.message}
            {...registerField('email')}
            required
          />
          
          {/* Password field */}
          <Input
            label="Пароль"
            placeholder="••••••••"
            type="password"
            error={errors.password?.message}
            {...registerField('password')}
            required
          />

          {/* Confirm password - only for registration */}
          {!isLogin && (
            <Input
              label="Подтвердите пароль"
              placeholder="••••••••"
              type="password"
              error={errors.confirmPassword?.message}
              {...registerField('confirmPassword')}
              required
            />
          )}
          
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            className="w-full"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span 
            onClick={toggleMode}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? 'Создать' : 'Войти'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;