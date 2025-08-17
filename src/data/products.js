const products = [
  {
    id: '1',
    title: 'iPhone 14',
    description: 'Smartphone de alta gama',
    price: 1199,
    stock: 5,
    category: 'celulares',
    image: '/src/Props/iPhone-14.webp',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23',
    description: 'Android flagship',
    price: 999,
    stock: 7,
    category: 'celulares',
    image: '/src/Props/Samsung-Galaxy-S23.webp',
  },
  {
    id: '3',
    title: 'Xiaomi Redmi Note 12',
    description: 'Relacion calidad/precio imbatible',
    price: 349,
    stock: 12,
    category: 'celulares',
    image: '/src/Props/Xiaomi-Redmi-Note-12.webp',
  },
  {
    id: '4',
    title: 'MacBook Air M2',
    description: 'Ultraliviana y potente',
    price: 1499,
    stock: 4,
    category: 'notebooks',
    image: '/src/Props/MacBook-Air-M2.webp',
  },
  {
    id: '5',
    title: 'Lenovo IdeaPad 5',
    description: 'Notebook versátil para el día a día',
    price: 799,
    stock: 9,
    category: 'notebooks',
    image: '/src/Props/Lenovo-IdeaPad-5.webp',
  },
  {
    id: '6',
    title: 'Asus ROG Strix',
    description: 'Notebook gamer alta performance',
    price: 1899,
    stock: 3,
    category: 'notebooks',
    image: '/src/Props/Asus-ROG-Strix.webp',
  },
  {
    id: '7',
    title: 'Auriculares Bluetooth',
    description: 'Con cancelación de ruido',
    price: 129,
    stock: 15,
    category: 'accesorios',
    image: '/src/Props/Auriculares-Bluetooth-Sony.webp',
  },
  {
    id: '8',
    title: 'Cargador 65W',
    description: 'Carga rápida USB-C',
    price: 39,
    stock: 25,
    category: 'accesorios',
    image: '/src/Props/Cargador-65W.webp',
  },
  {
    id: '9',
    title: 'Mouse Inalámbrico',
    description: 'Ergonómico y silencioso',
    price: 25,
    stock: 30,
    category: 'accesorios',
    image: '/src/Props/Mouse-Inalámbrico.webp',
  },
];

export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}

export function getProducts(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryId) {
        resolve(products.filter((p) => p.category === categoryId));
      } else {
        resolve(products);
      }
    }, 600);
  });
}

export function getProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = products.find((p) => p.id === id);
      resolve(found || null);
    }, 600);
  });
}