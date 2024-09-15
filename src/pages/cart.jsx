import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import './cart.css';

function Cart() {
  const { products, removeProductFromCart, updateProductQuantity } = useContext(CartContext);

  const totalPrice = products.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const totalQuantity = products.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleQuantityChange = (id, change) => {
    const product = products.find((item) => item.id === id);
    if (product) {
      const newQuantity = product.quantity + change;
      if (newQuantity > 0) { // Prevent quantity from going below 1
        updateProductQuantity(id, newQuantity);
      }
    }
  };

  return (
    <div className="cart-container">
      <h1 className="text-3xl font-bold my-4 text-center text-yellow-500">Cart Items</h1>
      <div className="summary-container mb-6">
        <div className="summary-box bg-black text-yellow-500">
          <h2 className="font-bold">Total Price</h2>
          <h3 className="text-2xl">${totalPrice.toFixed(2)}</h3> {/* Fix the price to 2 decimal points */}
        </div>
        <div className="summary-box bg-black text-yellow-500">
          <h2 className="font-bold">Total Quantity</h2>
          <h3 className="text-2xl">{totalQuantity}</h3>
        </div>
        <div className="summary-box bg-yellow-500 text-black">
          <h2 className="font-bold">Proceed to Checkout</h2>
        </div>
      </div>
      {products.length === 0 ? (
        <h2 className="text-center text-xl">Your cart is empty</h2>
      ) : (
        products.map((item) => (
          <div
            key={item.id}
            className="cart-item flex items-center p-4 mb-4 border border-yellow-500 rounded-md bg-black text-yellow-500"
          >
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-36 h-36 rounded-md object-cover mr-4" 
            />
            <div className="flex-grow">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-lg">Price: ${item.price}</p>
              <p className="text-lg">Total: ${(item.price * item.quantity).toFixed(2)}</p> {/* Display total price for the item */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="px-2 py-1 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                >
                  -
                </button>
                <span className="mx-4 text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="px-2 py-1 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeProductFromCart(item.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Item
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;




