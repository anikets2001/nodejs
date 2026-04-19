const User = require('../models/User');

async function handleGetAllUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function handleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleCreateUser(req, res){
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleUpdateUserById(req, res){
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleDeleteUserById(req, res){
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById
};