import React, { useEffect, useState } from 'react';
import { Grid, Container, TextField, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
    };
    getProducts();
  }, []);

  const handleFilterChange = () => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    if (company) {
      filtered = filtered.filter(product => product.company === company);
    }
    if (rating) {
      filtered = filtered.filter(product => product.rating >= Number(rating));
    }
    if (priceRange) {
      filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    }
    if (availability !== '') {
      filtered = filtered.filter(product => product.availability === (availability === 'true'));
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [category, company, rating, priceRange, availability]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select value={company} onChange={(e) => setCompany(e.target.value)}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="company1">Company 1</MenuItem>
              <MenuItem value="company2">Company 2</MenuItem>
              <MenuItem value="company3">Company 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price Range"
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <TextField
            fullWidth
            label="To"
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllProducts;
