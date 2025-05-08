import { phones } from './phones';
import { users } from './users';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Phone APIs
export const getPhones = async () => {
  await delay(500);
  return phones;
};

export const getPhoneById = async (id) => {
  await delay(300);
  return phones.find(phone => phone.id === id);
};

// User APIs
export const getUsers = async () => {
  await delay(500);
  return users;
};

export const getUserById = async (id) => {
  await delay(300);
  return users.find(user => user.id === id);
};

export const login = async (username, password) => {
  await delay(500);
  const user = users.find(u => u.username === username);
  if (user) {
    return { ...user, token: 'mock-jwt-token' };
  }
  throw new Error('Invalid credentials');
};

// Order APIs
export const createOrder = async (userId, items) => {
  await delay(800);
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('User not found');

  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: 'pending',
    items
  };

  user.orders.push(newOrder);
  return newOrder;
};

export const getOrders = async (userId) => {
  await delay(500);
  const user = users.find(u => u.id === userId);
  return user ? user.orders : [];
}; 