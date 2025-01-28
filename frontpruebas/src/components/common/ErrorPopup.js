import React, { useEffect } from 'react'; 

const ErrorPopup = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Cierra el pop-up después de 5 segundos.
      }, 5000);
      return () => clearTimeout(timer); // Limpia el temporizador al desmontar.
    }
  }, [message, onClose]);

  if (!message) return null; // Si no hay mensaje, no se renderiza nada.

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#ffebee',
        color: '#c62828',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: '#c62828',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default ErrorPopup;