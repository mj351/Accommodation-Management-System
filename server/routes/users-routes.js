const express = require('express');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email
  });
  await user.save();
  res.send(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email
  }, { new: true });
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});