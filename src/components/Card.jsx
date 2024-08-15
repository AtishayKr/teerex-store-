/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice/cartSlice';

const Card = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (

    <div className="card shadow-lg rounded" style={{ width: '15rem' }}>
      <img
        src={product.imageURL}
        className="card-img-top"
        alt={product.name}
        style={{ height: '150px', objectFit: 'contain' }}
      />
      <div className="card-body">
        <h5 className="card-title text-center">{product.name}</h5>
        <p className="card-text text-muted text-center">₹{product.price}</p>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
