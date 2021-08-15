import { Router } from "express";
import service from '@/services/tasks'
const router = Router();
router.get('/', async (req, res) => {
    try {
        const tasks = await service.getTasks();
        res.status(200).json(tasks);
    } catch(error) {
        console.log('error ', error);
        res.status(500).json("Error");
    }    
});

router.post('/', async (req, res) => {
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
        const tasks = await service.addTask(value);
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

router.delete('/:id', async (req, res) => {
    try {
        const inputId = req.params.id;
        const id = parseInt(inputId, 10);
        const tasks = await service.removeTask(id);
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

export default router