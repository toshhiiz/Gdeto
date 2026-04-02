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
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <h2>{isLogin ? 'Вход в личный кабинет' : 'Регистрация'}</h2>
        
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
        
        <Input
          label="Email"
          placeholder="example@mail.com"
          type="email"
          error={errors.email?.message}
          {...registerField('email')}
          required
        />
        
        <Input
          label="Пароль"
          placeholder="••••••••"
          type="password"
          error={errors.password?.message}
          {...registerField('password')}
          required
        />

        {/* Ссылка "Забыли пароль" показывается только при входе */}
        {isLogin && (
          <div className="form-meta">
            <a href="#" className="text-sm">Забыли пароль?</a>
          </div>
        )}

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

        <p className="auth-switch text-center">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span onClick={toggleMode}>
            {isLogin ? 'Создать' : 'Войти'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;