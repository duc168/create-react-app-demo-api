const db = {
    tasks: [
        {
            id: 1,
            value: 'Nisi culpa sunt dolore est do in reprehenderit eu dolore deserunt occaecat quis velit.',
        },
        {
            id: 2,
            value: 'Excepteur pariatur ad deserunt tempor do fugiat officia amet proident consequat et sit.'
        },
        {
            id: 3,
            value: 'Eiusmod dolor duis aliquip mollit ea velit.'
        },
        {
            id: 4,
            value: 'Do voluptate ut cillum esse laboris ut voluptate ullamco laboris reprehenderit consequat do.'
        }
    ]
}
const getData =() => {
    return new Promise((resolve, reject) => {
        resolve(db);
    });
}

const getTasks = () => {
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

const addTask = (value) => {
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

const removeTask = (id) => {
    return new Promise((resolve, reject) => {
        if (typeof id !== 'number') reject('Invalid Id');
        db.tasks = db.tasks.filter(task => task.id !== id);
        console.log(db.tasks);
        resolve(db.tasks);
    });
}

module.exports = {
    getData,
    getTasks,
    addTask,
    removeTask
}