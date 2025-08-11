import axios from 'axios';
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const postMessage = async (message: string) => {
  try {
    const response = await api.post('/posts', {
      title: 'Chat Message',
      body: message,
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting message:', error);
    throw error;
  }
};

export const getResponse = async (message: string) => {
  try {
    const response = await api.get(`/posts/${Math.floor(Math.random() * 100) + 1}`);
    return response.data.body;
  } catch (error) {
    console.error('Error getting response:', error);
    throw error;
  }
};
