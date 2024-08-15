/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice/cartSlice";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const [stockQuantity, setStockQuantity] = useState(null);
  const { items } = useSelector((state) => state.cart);

  useEffect(() => {
    const current = items.filter((item) => item.id === product.id);
    setStockQuantity(
      product.quantity -
        (current[0]?.cartQuantity ? current[0]?.cartQuantity : 0)
    );
    // setStockQuantity(product.quantity);
  }, []);

  const handleAddToCart = (item) => {
    const current = items.filter((item) => item.id === product.id);
    setStockQuantity(
      item.quantity -
        (current[0]?.cartQuantity ? current[0]?.cartQuantity + 1 : 1)
    );
    dispatch(addToCart(product));
  };

  return (
    <div className="card shadow-lg rounded" style={{ width: "15rem" }}>
      <img
        src={product.imageURL}
        className="card-img-top"
        alt={product.name}
        style={{ height: "150px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title text-center mb-3">{product.name}</h5>

        <div className="text-center mb-2">
          <p className="card-text text-muted mb-1">
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p className="card-text mb-1">
            <strong>Color:</strong> {product.color}
          </p>
          <p className="card-text mb-1">
            <strong>Gender:</strong> {product.gender}
          </p>
          <p className="card-text mb-1">
            <strong>In Stock:</strong>{" "}
            <span className="text-success">
              {stockQuantity > 0 ? stockQuantity : 0} items
            </span>
          </p>
        </div>

        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center"
            style={{
              background: "linear-gradient(90deg, #007bff 0%, #0056b3 100%)",
              borderRadius: "30px",
              padding: "10px 20px",
              transition: "background-color 0.3s, transform 0.3s",
              fontWeight: "bold",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => handleAddToCart(product)}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            <i className="fas fa-shopping-cart me-2"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
