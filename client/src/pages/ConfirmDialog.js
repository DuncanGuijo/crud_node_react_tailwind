import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="bg-red-800 p-5 rounded-lg shadow-lg z-10">
        <h2 className="text-xl font-semibold mb-4 text-red-300">Confirmación</h2>
        <p className="mb-4 text-red-100">¿Estás seguro de que quieres eliminar este producto?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ConfirmDialog;