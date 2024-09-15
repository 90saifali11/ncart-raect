import { createContext, useState } from "react";

// Create the context
export const CartContext = createContext();

// CartContext provider
function CartContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  // Function to update product quantity
  const updateProductQuantity = (id, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  // Function to remove product from the cart
  const removeProductFromCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts, // In case you need to directly set products
        updateProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
