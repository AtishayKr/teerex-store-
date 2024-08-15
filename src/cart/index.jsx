import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  addToCart,
  decreaseQuantity,
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
    dispatch(addToCart(product));
  };
  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container">
      <h1 className="text-center">Shopping Cart</h1>
      {totalQuantity === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-center py-3"
              >
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "15px",
                    }}
                    className="img-fluid"
                  />
                  <div>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0">
                      ₹{item.price} x {item.cartQuantity}
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleDecreaseQuantity(item)}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="mx-2">{item.cartQuantity}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleIncreaseQuantity(item)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="text-center">Total Quantity: {totalQuantity}</h4>
          <h4 className="text-center">
            Total Amount: ₹{totalAmount.toFixed(2)}
          </h4>
          <div className="text-center">
            <button className="btn btn-danger mt-3" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
