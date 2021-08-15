import express from 'express';
import cors from 'cors'
import Home from './home'
import Tasks from './tasks'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(Home);
app.use(Tasks)
const runningPort = 9191;
app.listen(runningPort, () => {
    console.log('Api is running now');
});