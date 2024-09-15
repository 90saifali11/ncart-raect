import { Link } from "react-router-dom";
import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { CartContext } from "../context/CartContext";

function Header() {
  const { user } = useContext(UserContext) || {}; // Defensive check
  const { products } = useContext(CartContext) || { products: [] }; // Defensive check
  const defaultAvatar = "https://via.placeholder.com/30?text=P"; // Default avatar

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Product E-Store
        </Link>
        <nav className="nav">
          <Link to="/products" className="nav-link">
            Home
          </Link>
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>

          {user?.isLogin ? (
            <div className="user-info">
              <Link to="/profile" className="nav-link user-profile-link">
                <span className="user-email">{user?.userInfo?.email}</span>
              </Link>
              <img
                src={user?.userInfo?.photoURL || defaultAvatar}
                alt="User Avatar"
                className="user-avatar"
              />
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </div>
          )}

          {/* Cart icon with count */}
          <div className="cart-icon">
            <Link to="/cart" className="cart-link">
              <span className="cart-count">{products?.length || 0}</span>
              🛒 {/* A simple cart icon using emoji */}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;







