import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPropertySchema } from '../utils/validation';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { useAsync } from '../hooks/useAsync';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';
import { Alert } from '../components/UI/Alert';
import { PROPERTY_TYPES, DEAL_TYPES, RENT_PERIODS, KAZAKHSTAN_CITIES, TOAST_MESSAGES, API_URL } from '../constants/config';
import { getToken } from '../utils/storage';

const AddProperty = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [images, setImages] = useState([]);
  const [dealType, setDealType] = useState('Аренда');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      showError('Вы должны быть авторизованы для создания объявления');
    }
  }, [isAuthenticated, navigate, showError]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      dealType: 'Аренда',
      propertyType: 'Квартира',
      rooms: 1,
      area: 50,
      price: 100000,
      city: 'Астана',
      address: '',
      description: '',
      furnished: 'Да',
      rentPeriod: 'Помесячно',
      floor: 1,
      totalFloors: 5
    }
  });

  const { execute: submitProperty, status } = useAsync(async (data) => {
    // Загружаем изображения и получаем их пути
    const imagePaths = [];
    const token = getToken();
    
    if (!token) {
      throw new Error('Токен не найден. Пожалуйста, авторизуйтесь.');
    }
    
    for (const image of images) {
      if (image.file) {
        try {
          const formData = new FormData();
          formData.append('file', image.file);
          const uploadResponse = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
          
          if (uploadResponse.ok) {
            const uploadedData = await uploadResponse.json();
            if (uploadedData.url) {
              imagePaths.push(uploadedData.url);
            }
          } else {
            const errorData = await uploadResponse.json();
            throw new Error(`Ошибка загрузки: ${errorData.error || uploadResponse.status}`);
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      }
    }

    // Отправляем объявление с путями изображений
    const propertyData = {
      ...data,
      images: imagePaths,
      rooms: parseInt(data.rooms),
      area: parseInt(data.area),
      price: parseInt(data.price),
      floor: parseInt(data.floor),
      totalFloors: parseInt(data.totalFloors)
    };

    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(propertyData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Ошибка при создании объявления');
    }

    return await response.json();
  });

  const onSubmit = async (data) => {
    try {
      if (images.length === 0) {
        showError('Загрузите хотя бы одно изображение');
        return;
      }

      await submitProperty(data);
      showSuccess('Объявление успешно создано!');
      navigate('/');
    } catch (error) {
      showError(error.message || 'Ошибка при создании объявления');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      // Revoke object URL to free memory
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return updated;
    });
  };

  const propertyTypeOptions = PROPERTY_TYPES.map(type => ({
    label: type,
    value: type
  }));

  const roomOptions = ['1', '2', '3', '4', '5', '6'].map(n => ({
    label: n + ' комн.',
    value: n
  }));

  const furnishedOptions = [
    { label: 'Да', value: 'Да' },
    { label: 'Нет', value: 'Нет' }
  ];

  const rentPeriodOptions = [
    { label: 'Помесячно', value: 'Помесячно' },
    { label: 'Посуточно', value: 'Посуточно' }
  ];

  const cityOptions = KAZAKHSTAN_CITIES.filter(c => c !== 'Все города').map(city => ({
    label: city,
    value: city
  }));

  return (
    <div className="add-property-page">
      <div className="add-container">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Новое объявление</h2>
        <p className="text-gray-600 mb-8">Заполните данные о вашей недвижимости</p>

        <form onSubmit={handleSubmit(onSubmit)} className="add-form">
          
          {/* Deal Type Section */}
          <div className="form-section">
            <h3>Тип сделки</h3>
            <div className="space-y-3">
              {Object.entries(DEAL_TYPES).map(([key, value]) => (
                <label key={key}>
                  <input 
                    type="radio" 
                    name="dealType" 
                    value={value}
                    defaultChecked={dealType === value}
                    onChange={() => setDealType(value)}
                    {...register('dealType')}
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h3>Основная информация</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Тип недвижимости"
                options={propertyTypeOptions}
                error={errors.propertyType?.message}
                {...register('propertyType')}
              />
              <Input
                label="Количество комнат"
                type="number"
                min="1"
                max="20"
                error={errors.rooms?.message}
                {...register('rooms', { valueAsNumber: true })}
              />
              <Input
                label="Площадь (м²)"
                type="number"
                min="10"
                error={errors.area?.message}
                {...register('area', { valueAsNumber: true })}
              />
              <Input
                label="Цена (₸)"
                type="number"
                min="1000"
                error={errors.price?.message}
                {...register('price', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Rental Period - only for rent deals */}
          {dealType === 'Аренда' && (
            <div className="form-section">
              <h3>Период аренды</h3>
              <Select
                label="Тип аренды"
                options={rentPeriodOptions}
                {...register('rentPeriod')}
              />
            </div>
          )}

          {/* Location and Description */}
          <div className="form-section">
            <h3>Расположение и описание</h3>
            <Select
              label="Город"
              options={cityOptions}
              error={errors.city?.message}
              {...register('city')}
            />
            <Input
              label="Точный адрес"
              placeholder="Улица, номер дома, квартира..."
              error={errors.address?.message}
              {...register('address')}
              required
            />
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '13px', color: 'var(--text-main)' }}>
                Описание объекта
              </label>
              <textarea
                {...register('description')}
                rows="6"
                placeholder="Расскажите о преимуществах вашей недвижимости..."
                style={{ 
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: errors.description ? '1px solid #DC2626' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'inherit'
                }}
              />
              {errors.description && (
                <p style={{ color: '#DC2626', fontSize: '13px', marginTop: '8px' }}>{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="form-section">
            <h3>Дополнительно</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Меблировка"
                options={furnishedOptions}
                {...register('furnished')}
              />
              <Input
                label="Этаж"
                type="number"
                min="1"
                {...register('floor', { valueAsNumber: true })}
              />
              <Input
                label="Всего этажей"
                type="number"
                min="1"
                {...register('totalFloors', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="form-section">
            <h3>Фотографии</h3>
            <label className="image-upload-section">
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>📸</div>
              <p className="image-upload-text">Загрузите фотографии</p>
              <p className="image-upload-hint">или перетащите их сюда</p>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {images.length > 0 && (
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '12px' }}>
                  Загруженные фото ({images.length})
                </p>
                <div className="image-gallery">
                  {images.map(image => (
                    <div key={image.id} className="image-item">
                      <img src={image.preview} alt="preview" />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="image-remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-buttons">
            <Link to="/" className="flex-1">
              <Button variant="secondary" size="lg" style={{ width: '100%' }}>
                Отмена
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={status === 'pending'}
              className="flex-1"
            >
              Опубликовать объявление
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;