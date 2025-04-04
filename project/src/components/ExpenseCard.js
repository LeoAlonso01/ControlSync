import React from 'react';
import PropTypes from 'prop-types';

const ExpenseCard = ({ category, amount, date }) => {
  // Validación básica para evitar errores
  if (!category || !amount || !date) {
    console.error('Error: Faltan props en ExpenseCard', { category, amount, date });
    return null; // No renderizamos nada si faltan props
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4 transition-all hover:scale-[1.02] hover:shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold">{category ? category[0] : '?'}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{category || 'Sin categoría'}</h3>
            <p className="text-sm text-gray-500">{date || 'Sin fecha'}</p>
          </div>
        </div>
        <span className="text-lg font-bold text-red-600">-${amount.toFixed(2)}</span>
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  category: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string,
};

export default ExpenseCard;