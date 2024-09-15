import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";
import './Products.css'; // Import the custom CSS file

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchTerm, setSearchTerm] = useState(""); // New search term state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url =
          chosenCategory === "All"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${chosenCategory}`;
        const response = await axios.get(url);
        let fetchedProducts = response.data; // Directly use response.data

        // Apply sorting
        if (sortBy === "a-z") {
          fetchedProducts = fetchedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "price-low-high") {
          fetchedProducts = fetchedProducts.sort((a, b) => a.price - b.price);
        }

        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [chosenCategory, sortBy]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {loading ? (
        <h1 className="loading">Loading....</h1>
      ) : error ? (
        <h1 className="error">{error}</h1>
      ) : (
        <div>
          {/* Search Input */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              className="search-input"
            />
          </div>
          {/* Sorting Buttons */}
          <div className="sort-buttons">
            <button
              className={`sort-button ${sortBy === "a-z" ? "active" : ""}`}
              onClick={() => setSortBy("a-z")}
            >
              Sort by A-Z
            </button>
            <button
              className={`sort-button ${sortBy === "price-low-high" ? "active" : ""}`}
              onClick={() => setSortBy("price-low-high")}
            >
              Sort by Price (Low to High)
            </button>
          </div>

          {/* Category Chips */}
          <div className="category-chips">
            <div
              className={`category-chip ${chosenCategory === "All" ? "selected" : ""}`}
              onClick={() => setChosenCategory("All")}
            >
              All
            </div>
            {categories.map((category) => (
              <div
                className={`category-chip ${category === chosenCategory ? "selected" : ""}`}
                onClick={() => setChosenCategory(category)}
                key={category}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Product Cards */}
          <div className="product-cards">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard item={item} key={item.id} className="product-card" />
              ))
            ) : (
              <p className="no-products">No products available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
