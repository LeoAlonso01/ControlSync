import React, { useState } from 'react';

const AddExpenseModal = ({ onClose, onAdd }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (category && amount) {
      const newExpense = { 
        category, 
        amount: parseFloat(amount), 
        date: new Date().toLocaleDateString() 
      };
      console.log('Enviando gasto:', newExpense); // Log para verificar el objeto
      onAdd(newExpense);
      onClose();
    } else {
      console.error('Error: Los campos categoría y monto son obligatorios.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Nuevo Gasto</h2>
        <input 
          type="text" 
          placeholder="Categoría" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="number" 
          placeholder="Monto" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseModal;