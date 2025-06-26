const express = require('express');
const router = express.Router();
let items = require('../data/store');

// GET /items
router.get('/', (req, res) => {
  res.json(items);
});

// GET /items/:id
router.get('/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST /items
router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const newItem = {
    id: items.length + 1,
    name,
    description
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id
router.put('/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  item.name = name;
  item.description = description;
  res.json(item);
});

// DELETE /items/:id
router.delete('/:id', (req, res) => {
  const index = items.findIndex(i => i.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  const deleted = items.splice(index, 1);
  res.json({ message: 'Item deleted', item: deleted[0] });
});

module.exports = router;
