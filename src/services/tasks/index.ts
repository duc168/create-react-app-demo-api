import { ITask } from '@/interfaces/tasks';
import db from '@/models/index'

const getTasks = (): Promise<ITask[]> => {
    return new Promise((resolve, reject) => {
        resolve(db.tasks);
    });
}
const getMaxId = () => {
    const listId = db.tasks.map(task => task.id)
    let maxId = 0;
    for (const id of listId) {
        if (id > maxId) maxId = id;
    }
    return maxId;
}

const addTask = (value: string): Promise<ITask[]> => {
    return new Promise((resolve, reject) => {
        const maxId = getMaxId();
        db.tasks.push({ 
        id: maxId + 1,
        value: value
        });
        console.log(db.tasks)
        resolve(db.tasks);
    });
}

const removeTask = (id: number): Promise<ITask[]> => {
    return new Promise((resolve, reject) => {
        if (typeof id !== 'number') reject('Invalid Id');
        db.tasks = db.tasks.filter(task => task.id !== id);
        console.log(db.tasks);
        resolve(db.tasks);
    });
}

export default {
    getTasks,
    addTask,
    removeTask
}