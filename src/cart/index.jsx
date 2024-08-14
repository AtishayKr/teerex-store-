import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  addToCart,
} from "../features/cartSlice/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ id: productId }));
  };

  const handleIncreaseQuantity = (product) => {
    console.log("clicked")
    dispatch(addToCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {totalQuantity === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.name}</h5>
                  <p>
                    ${item.price} x {item.cartQuantity}
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    Increase
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4>Total Quantity: {totalQuantity}</h4>
          <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
          <button className="btn btn-danger mt-3" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
