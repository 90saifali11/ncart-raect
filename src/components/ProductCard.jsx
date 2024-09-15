import { Link } from "react-router-dom";
import './ProductCard.css'; // Import a CSS file for additional styling

function ProductCard({ item }) {
  const { image, category, title, price, id } = item;

  return (
    <Link
      to={`/products/${id}`}
      className="product-card"
    >
      <div className="product-card-content">
        <div className="product-card-image">
          <img
            alt="ecommerce"
            className="product-image"
            src={image}
          />
        </div>
        <div className="product-card-details">
          <h3 className="product-category">
            {category}
          </h3>
          <h2 className="product-title">
            {title}
          </h2>
          <p className="product-price">
            ${price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

