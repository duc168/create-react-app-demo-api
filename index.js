const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
    res.status(200).json({
        "code": 200,
        "data": {
            "test": "Welcome to Test API"
        }
    })
});

// app.get('/tasks', (req, res) => {
//     db.getTasks().then(tasks => {
//         console.log('tasks', tasks);
//         res.status(200).json(tasks);
//     }).catch(err => {
//         console.log('err ', err);
//         res.status(500).json("Server Error");
//     }).finally(() => {

//     });    
// });

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await db.getTasks();
        res.status(200).json(tasks);
    } catch(error) {
        console.log('error ', error);
        res.status(500).json("Error");
    }    
});

app.post('/tasks', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
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

const runningPort = 9191;

app.listen(runningPort, () => {
    console.log('Api is running now');
});