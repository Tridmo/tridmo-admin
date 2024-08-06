export const months = [
  { number: 1, name: 'Январь' },
  { number: 2, name: 'Февраль' },
  { number: 3, name: 'Март' },
  { number: 4, name: 'Апрель' },
  { number: 5, name: 'Май' },
  { number: 6, name: 'Июнь' },
  { number: 7, name: 'Июль' },
  { number: 8, name: 'Август' },
  { number: 9, name: 'Сентябрь' },
  { number: 10, name: 'Октябрь' },
  { number: 11, name: 'Ноябрь' },
  { number: 12, name: 'Декабрь' }
];

export const interiorStatuses = {
  0: {
    text: 'Непроверено',
    bgcolor: '#ffffcc',
    color: '#999900',
  },
  1: {
    text: 'Проверено',
    bgcolor: '#ccffdd',
    color: '#006600',
  },
}

export const modelStatuses = {
  1: 'Доступно',
  2: 'Не доступно',
  3: 'Под заказ',
}

export const categoryTypes = [
  {
    value: 'model',
    name: 'Для моделей'
  },
  {
    value: 'interior',
    name: 'Для интерьеров'
  },
]

export const categorySections = {
  model: [
    {
      value: 'main',
      name: 'Главная'
    }
  ],
  interior: [
    {
      value: 'main',
      name: 'Главная'
    },
    {
      value: 'architecture',
      name: 'Архитектура'
    },
  ]
} 