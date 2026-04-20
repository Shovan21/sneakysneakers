import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
      ) : (
        <div className="product-card-image-placeholder">👟</div>
      )}

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">{product.category || 'Sneakers'}</span>
          <span className="product-card-price">₹{product.price.toFixed(2)}</span>
        </div>

        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-desc">{product.description}</p>

        <button className="product-card-btn" onClick={() => addToCart(product)}>
          <ShoppingBag size={15} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
