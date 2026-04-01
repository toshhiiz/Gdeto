import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Функция, которая сработает при нажатии на кнопку "Войти"
  const handleSubmit = (e) => {
    e.preventDefault(); // Останавливаем стандартную перезагрузку формы
    
    // В будущем здесь будет запрос к нашему Node.js серверу для проверки пароля
    alert(isLogin ? 'Успешный вход!' : 'Успешная регистрация!');
    
    // После успешного входа перекидываем пользователя обратно на главную
    navigate('/'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Вход в личный кабинет' : 'Регистрация'}</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Поле "Имя" показываем только при регистрации */}
          {!isLogin && (
            <div className="form-group">
              <label>Имя</label>
              <input type="text" placeholder="Иван Иванов" required />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" required />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="submit-btn">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Создать' : 'Войти'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;