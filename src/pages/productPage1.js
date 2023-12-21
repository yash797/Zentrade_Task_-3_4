// src/components/ProductPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const productData = response.data.products;

        // Convert the object into an array
        const productArray = Object.keys(productData).map((key) => ({
          id: key,
          subcategory: productData[key].subcategory,
          title: productData[key].title,
          price: productData[key].price,
          popularity: productData[key].popularity,
        }));

        // Sort the products based on descending popularity
        const sortedProducts = productArray.sort((a, b) => b.popularity - a.popularity);
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 text-center mt-8">Product Page</h1>
      <table className=" border border-gray-300 mx-auto mt-10">
        <thead>
          <tr>
            <th className="border p-2 w-96">Title</th>
            <th className="border p-2 w-60">Subcategory</th>
            <th className="border p-2 w-60">Price</th>
            <th className="border p-2 w-60">Popularity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">{product.subcategory}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
