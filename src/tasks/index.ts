import { Router } from "express";
import db from './db'
const tasksRouter = Router();
tasksRouter.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.getTasks();
        res.status(200).json(tasks);
    } catch(error) {
        console.log('error ', error);
        res.status(500).json("Error");
    }    
});

tasksRouter.post('/tasks', async (req, res) => {
    try {
        const { value } = req.body;
        if (typeof value !== 'string') {
            res.status(400).json("Invalid Value");
            return
        }
        if (value === '') {
            res.status(400).json("Invalid Value");
            return
        }
        const tasks = await db.addTask(value);
        const result = tasks.length > 0;
        res.status(200).json({
            status: result,
            message: "Create task successfully."
        });
    } catch(error) {
        console.log(error);
        res.status(500).json("error");
    }
});

tasksRouter.delete('/tasks/:id', async (req, res) => {
    try {
        const inputId = req.params.id;
        const id = parseInt(inputId, 10);
        const tasks = await db.removeTask(id);
        const result = tasks.length >= 0;        
        res.status(200).json({
            status: result,
            message: "Remove task successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

export default tasksRouter