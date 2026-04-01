import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPropertySchema } from '../utils/validation';
import { useNotification } from '../context/NotificationContext';
import { useAsync } from '../hooks/useAsync';
import { Input } from '../components/UI/Input';
import { Select } from '../components/UI/Select';
import { Button } from '../components/UI/Button';
import { Alert } from '../components/UI/Alert';
import { PROPERTY_TYPES, DEAL_TYPES, RENT_PERIODS, KAZAKHSTAN_CITIES, TOAST_MESSAGES } from '../constants/config';

const AddProperty = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [images, setImages] = useState([]);
  const [dealType, setDealType] = useState('Аренда');

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
    // Симмуляция отправки на сервер
    // В реальном приложении это был бы запрос к API
    console.log('Submitting property:', data, 'Images:', images);
    
    // Имитация задержки сервера
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return { success: true };
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
      <div className="add-container max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Новое объявление</h2>
        <p className="text-gray-600 mb-8">Заполните данные о вашей недвижимости</p>

        <form onSubmit={handleSubmit(onSubmit)} className="add-form space-y-8">
          
          {/* Deal Type Section */}
          <div className="form-section border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Тип сделки</h3>
            <div className="space-y-3">
              {Object.entries(DEAL_TYPES).map(([key, value]) => (
                <label key={key} className="flex items-center cursor-pointer">
                  <input 
                    type="radio" 
                    name="dealType" 
                    value={value}
                    defaultChecked={dealType === value}
                    onChange={() => setDealType(value)}
                    {...register('dealType')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-gray-700">{value}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Основная информация</h3>
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
            <div className="form-section border-b pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Период аренды</h3>
              <Select
                label="Тип аренды"
                options={rentPeriodOptions}
                {...register('rentPeriod')}
              />
            </div>
          )}

          {/* Location and Description */}
          <div className="form-section border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Расположение и описание</h3>
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
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Описание объекта
              </label>
              <textarea
                {...register('description')}
                rows="6"
                placeholder="Расскажите о преимуществах вашей недвижимости..."
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${
                  errors.description ? 'border-red-500' : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="form-section border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Дополнительно</h3>
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
          <div className="form-section border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Фотографии</h3>
            <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition">
              <div className="text-4xl mb-2">📸</div>
              <p className="text-gray-700 font-semibold">Загрузите фотографии</p>
              <p className="text-gray-500 text-sm">или перетащите их сюда</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Загруженные фото ({images.length})
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map(image => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt="preview"
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions flex gap-4">
            <Link to="/" className="flex-1">
              <Button variant="secondary" size="lg" className="w-full">
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