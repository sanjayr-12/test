export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  specs: string;
}

export const productList: Product[] = [
  {
    id: 1,
    name: "Pixel 8 Pro",
    category: "Phone",
    price: 999,
    specs: "Best camera, Google AI features",
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra",
    category: "Phone",
    price: 1299,
    specs: "Powerful S Pen, great zoom",
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    category: "Phone",
    price: 1099,
    specs: "A17 Bionic chip, premium build",
  },
  {
    id: 4,
    name: "Zenbook Duo",
    category: "Laptop",
    price: 1499,
    specs: "Dual-screen OLED, high performance",
  },
  {
    id: 5,
    name: "MacBook Air M3",
    category: "Laptop",
    price: 1099,
    specs: "Silent, fanless design, long battery life",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 399,
    specs: "Industry-leading noise cancellation",
  },
  {
    id: 7,
    name: "Bose QuietComfort Ultra",
    category: "Headphones",
    price: 429,
    specs: "Immersive audio, comfortable fit",
  },
  {
    id: 8,
    name: "Pixel 7a",
    category: "Phone",
    price: 449,
    specs: "Great value, flagship camera sensor",
  },
  {
    id: 9,
    name: "Dell XPS 15",
    category: "Laptop",
    price: 1399,
    specs: "Stunning display, powerful internals",
  },
];
