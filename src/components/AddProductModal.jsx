import React, { useState } from 'react';

// Styles for the new modal
const addModalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    width: '500px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
    color: '#0F1111',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#0F1111',
  },
  input: {
    fontSize: '14px',
    padding: '10px',
    border: '1px solid #a6a6a6',
    borderRadius: '4px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '15px',
  },
  button: {
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  primaryButton: {
    backgroundColor: '#FFD814', // Amazon Yellow
    color: '#0F1111',
    border: '1px solid #FCD200',
  },
  secondaryButton: {
    backgroundColor: '#F0F2F2',
    color: '#0F1111',
    border: '1px solid #DDD',
  },
};

// The Modal Component
export function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation (same as your prompt logic)
    if (title === '' || price === '' || imageUrl === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Pass the new product up to the parent
    onAddProduct({
      title: title,
      price: parseInt(price),
      imageUrl: imageUrl,
    });

    // Clear form and close the modal
    setTitle('');
    setPrice('');
    setImageUrl('');
    onClose();
  };

  // If the modal isn't open, render nothing
  if (!isOpen) {
    return null;
  }

  return (
    <div style={addModalStyles.backdrop} onClick={onClose}>
      <div style={addModalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <h1 style={addModalStyles.title}>Add a New Product</h1>
        
        <form onSubmit={handleSubmit} style={addModalStyles.form}>
          <div style={addModalStyles.inputGroup}>
            <label style={addModalStyles.label}>Product Title</label>
            <input
              type="text"
              style={addModalStyles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Mechanical Keyboard"
            />
          </div>

          <div style={addModalStyles.inputGroup}>
            <label style={addModalStyles.label}>Price</label>
            <input
              type="number"
              style={addModalStyles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 858"
            />
          </div>

          <div style={addModalStyles.inputGroup}>
            <label style={addModalStyles.label}>Image URL</label>
            <input
              type="text"
              style={addModalStyles.input}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div style={addModalStyles.buttonGroup}>
            <button
              type="button"
              style={{ ...addModalStyles.button, ...addModalStyles.secondaryButton }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ ...addModalStyles.button, ...addModalStyles.primaryButton }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}