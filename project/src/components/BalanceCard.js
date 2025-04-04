import React from 'react';

const BalanceCard = ({ total, income, expenses }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl p-6 text-white shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Balance Total</h2>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">${total.toFixed(2)}</h1>
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-sm opacity-80">Ingresos</p>
            <p className="font-semibold">${income.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Gastos</p>
            <p className="font-semibold text-red-200">${expenses.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;