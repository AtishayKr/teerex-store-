/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice/cartSlice';

const Card = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={product.imageURL} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
