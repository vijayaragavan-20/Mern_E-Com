import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => setProducts(products.filter(p => p._id !== id)));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Price</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
