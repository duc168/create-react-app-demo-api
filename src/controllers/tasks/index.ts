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
        const addedTask = await service.addTask(value);
        res.status(200).json({
            status: addedTask.id,
            message: "Create task successfully."
        });
    } catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const inputId = req.params.id;
        const removedTaskId = await service.removeTask(inputId);
        res.status(200).json({
            status: typeof removedTaskId === 'number',
            message: "Remove task successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

export default router