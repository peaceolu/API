const express = require('express');
const itemsRouter = require('./routes/items');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes
app.use('/items', itemsRouter);

// Handle Invalid Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
