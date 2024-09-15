import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { addItemToLocalStorage, getItemsFromLocalStorage, isItemAddedToCart } from "../utils/localStorage";
import './productDetail.css';

function ProductDetail() {
  const { setProducts } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.image); // Debug: Log the image URL
        setProduct(data);
        setIsAdded(isItemAddedToCart(data.id)); // Check if the item is in the cart
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    addItemToLocalStorage({ ...product, quantity: 1 });
    const allProducts = getItemsFromLocalStorage();
    setProducts([...allProducts]);
    setIsAdded(true); // Update the state to reflect the item being added to the cart
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="product-detail-container">
      {loading ? (
        <h1 className="text-center text-3xl">Loading....</h1>
      ) : notFound ? (
        <h1 className="text-center text-3xl">Product Not Found</h1>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                    Description
                  </a>
                  <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                    Reviews
                  </a>
                  <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                    Details
                  </a>
                </div>
                <p className="leading-relaxed mb-4">{product.description}</p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Color</span>
                  <span className="ml-auto text-gray-900">Blue</span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Size</span>
                  <span className="ml-auto text-gray-900">Medium</span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Quantity</span>
                  <span className="ml-auto text-gray-900">4</span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${product.price}
                  </span>
                  <button
                    onClick={addToCart}
                    className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    {isAdded ? "Add More" : "Add to Cart"}
                  </button>
                </div>
              </div>
              <img
                alt={product.title}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={product.image} // Use product image URL directly
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;




   