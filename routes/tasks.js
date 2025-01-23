const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Check if a date is passed already
const isPastDate = (date) => {
    const today = new Date();
    if (date < today.setHours(0,0,0,0)) {
        return true;
    }
    return false;
}

// Retrieve all tasks with optional filters
router.get('/', async (req, res) => {
    try {

        //Applying filters
        const tasks = await Task.find(req.body.filter);

        //Check if there are no matching tasks
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'Tasks not found' });
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a specific task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        //Check if the task is not found
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    });
    
// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        
        // Check if inputted due date is valid
        if (task.dueDate && isPastDate(task.dueDate)){
            return res.status(400).json({ message: `Validation failed: the date ${task.dueDate} inputted has passed.`})
        }

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });  
    }
});

// Update an existing task
router.patch('/:id', async (req, res) => {
try {
    //Use runValidatiors to check if priority input matches enum values
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // Check if inputted due date is valid
    if (task.dueDate && isPastDate(task.dueDate)){
        return res.status(400).json({ message: `Validation failed: the date ${task.dueDate} inputted has passed.`})
    }

    //Check if the task is not found
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
} catch (error) {
    res.status(400).json({ message: error.message });
}
});

// Delete a task
router.delete('/:id', async (req, res) => {
try {
    const task = await Task.findByIdAndDelete(req.params.id);

    //Check if the task is not found
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

module.exports = router;