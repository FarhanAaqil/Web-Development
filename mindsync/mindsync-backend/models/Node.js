const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  type: { type: String, enum: ['task', 'note', 'idea', 'goal'], required: true },
  title: { type: String, required: true },
  content: String,
  status: { type: String, enum: ['active', 'done'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  linkedNodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Node' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Node = mongoose.model('Node', nodeSchema);
module.exports = Node;
