const Node = require('../models/Node');
const User = require('../models/User');

exports.createNode = async (req, res) => {
  const { type, title, content, userId } = req.body;
  const newNode = new Node({ type, title, content, createdBy: userId });
  await newNode.save();

  const user = await User.findById(userId);
  user.nodes.push(newNode._id);
  await user.save();

  res.status(201).json(newNode);
};

exports.linkNodes = async (req, res) => {
  const { nodeId1, nodeId2 } = req.body;
  const node1 = await Node.findById(nodeId1);
  const node2 = await Node.findById(nodeId2);

  node1.linkedNodes.push(nodeId2);
  node2.linkedNodes.push(nodeId1);

  await node1.save();
  await node2.save();

  res.json({ message: 'Nodes linked successfully' });
};

exports.getUserNodes = async (req, res) => {
  const user = await User.findById(req.params.userId).populate('nodes');
  res.json(user.nodes);
};
