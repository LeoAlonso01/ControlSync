import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import ExpenseCard from './components/ExpenseCard';
import AddExpenseModal from './components/AddExpenseModal';

const API_URL = 'http://localhost:5000/expenses';

const App = () => {
  const [expenses, setExpenses] = useState([]); // Estado para almacenar los gastos
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExpenses(); // Llama a la función para cargar los gastos al montar el componente
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL);


      if (Array.isArray(response.data)) {

        setExpenses(response.data); // Actualizar el estado con los datos recibidos
      } else {
        console.error('Error: Los datos recibidos no son un array:', response.data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      alert('Error al cargar los gastos');
    }
  };

  const addExpense = async (newExpense) => {
    try {
      await axios.post(API_URL, newExpense);
      fetchExpenses(); // Recarga los gastos después de agregar uno nuevo
      setShowModal(false); // Cierra el modal después de agregar el gasto
      alert('Gasto agregado exitosamente');
      console.log(newExpense);

    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error al agregar el gasto');

    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchExpenses(); // Actualizar la lista de gastos
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  const calculateTotals = () => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const income = 5000; // Ejemplo de ingreso fijo
    return { total: income - totalExpenses, income, expenses: totalExpenses };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header title="GastoSync" />
      <div className="px-4 pt-20 space-y-6 max-w-md mx-auto">
        <BalanceCard total={totals.total} income={totals.income} expenses={totals.expenses} />
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Últimos Gastos</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Agregar
            </button>
          </div>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                category={expense.category}
                amount={expense.amount}
                date={expense.date}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay gastos registrados.</p>
          )}
        </div>
      </div>
      {showModal && <AddExpenseModal onClose={() => setShowModal(false)} onAdd={addExpense} />}
    </div>
  );
};

export default App;