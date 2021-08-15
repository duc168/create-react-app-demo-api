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

const addTask = (value: string): Promise<ITask> => {
    return new Promise((resolve, reject) => {
        if (typeof value !== 'string') {
            reject("Invalid Value");
        }
        if (value === '') {
            reject("Invalid Value");
        }
        const maxId = getMaxId();
        const newTask = {
            id: maxId + 1,
            value: value
        } as ITask
        db.tasks.push(newTask);
        resolve(newTask);
    });
}

const removeTask = (inputId: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        try {
            if (
                inputId === '' ||
                inputId === null ||
                inputId === undefined
                ) reject('Invalid Input Id');
            const id = parseInt(inputId, 10);
            if (typeof id !== 'number') reject('Invalid Id');
            db.tasks = db.tasks.filter(task => task.id !== id);
            resolve(id);
        } catch (error) {
            reject(error)
        }

    });
}

export default {
    getTasks,
    addTask,
    removeTask
}