import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test/primes';  // Replace with actual test server URL

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/products/${id}`);
  return response.data;
};
