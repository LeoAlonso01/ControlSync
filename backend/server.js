const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// MIdlewere
app.use(cors());
app.use(express.json());

// conexion con la bd
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Crear la tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL
  )
`, (err) => {
    if (err) {
        console.error('Error creating table ' + err.message);
    } else {
        console.log('Table created or already exists.');
    }
});

// Rutas
app.get('/expenses', (req, res) => {
  db.all('SELECT * FROM expenses', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log('Datos enviados al frontend:', rows); // Log para verificar los datos
    res.json(rows);
  });
});

// Agregar un nuevo gasto
app.post('/expenses', (req, res) => {
    const { category, amount, date } = req.body;
    console.log('Gasto recibido:', { category, amount, date }); // Log para verificar el objeto
    const sql = 'INSERT INTO expenses (category, amount, date) VALUES (?, ?, ?)';
    db.run(sql, [category, amount, date], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
  });

  // Eliminar un gasto
app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM expenses WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    });
  });

  // Actualizar un gasto
app.put('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { category, amount, date } = req.body;
    const sql = 'UPDATE expenses SET category = ?, amount = ?, date = ? WHERE id = ?';
    db.run(sql, [category, amount, date, id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    });
  });

  // Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });