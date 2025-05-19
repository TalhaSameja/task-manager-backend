import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  console.log("i am in getTasks")
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const { title } = req.body;
  const newTask = await Task.create({ title });
  res.status(201).json(newTask);
};

export const deleteTask = async (req, res) => {
  console.log("i am in delete")
  const { id } = req.body;
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
};

export const markComplete = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, { completed: true });
  res.json({ message: 'Task marked as completed' });
};
