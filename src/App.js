
import React, { useEffect, useState } from 'react';
import ProductTable from './components/ProductTable';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from all branches and combine
    const fetchData = async () => {
      try {
        const branchUrls = ["./api/branch1.json",
          "./api/branch2.json",
          "./api/branch3.json",
        ];
        const responses = await Promise.all(branchUrls.map(url => fetch(url)));
        const branches = await Promise.all(responses.map(response => response.json()));

        // Combine products and sum up revenues if they have the same name
        const combinedProducts = {};
        branches.forEach(branch => {
          branch.products.forEach(product => {
            if (combinedProducts[product.name]) {
              combinedProducts[product.name].totalRevenue += product.unitPrice * product.sold;
            } else {
              combinedProducts[product.name] = {
                name: product.name,
                totalRevenue: product.unitPrice * product.sold,
              };
            }
          });
        });

        // Convert to array and sort alphabetically
        const sortedProducts = Object.values(combinedProducts).sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setProducts(sortedProducts);


        setFilteredProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  // Handle filtering based on search input
  useEffect(() => {
    setFilteredProducts(
      products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  return (
    <div className="App">
      <h1>Revenue Aggregator</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductTable products={filteredProducts} />
    </div>
  );
};

export default App;


