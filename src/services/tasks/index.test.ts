import { ITask } from '@/interfaces/tasks';
import service from '@/services/tasks';

describe('Tasks', () => {
    test("Get", async () => {
        const tasks = await service.getTasks();
        const isArray = tasks.length !== undefined && tasks.length >= 0;
        expect(isArray).toBe(true);
    });
    describe('Add', () => {
        test('Success', async () => {
            const testValue = 'Working on a test.';
            const addTask = await service.addTask(testValue);
            expect(addTask.id > 0).toBe(true);
            expect(addTask.value).toBeTruthy();
            expect(addTask.value.length > 0).toBe(true);            
        });
        describe('Failed', () => {
            test('Invalid value', async () => {
                const testValue = '';
                let addTask: ITask;
                try {
                    addTask = await service.addTask(testValue);
                    expect(addTask).toBeFalsy();    
                } catch (error) {
                    expect(typeof error === 'string').toBe(true);
                }      
            })
        })
    });
    describe('Remove', () => {
        test('Success', async () => {
            const testValue = '23456';
            const addTask = await service.addTask(testValue);
            const inputId = addTask.id + '';
            const removedTaskId = await service.removeTask(inputId);
            expect(removedTaskId + '' === inputId).toBe(true);
            const tasks = await service.getTasks();
            expect(tasks.find(t => t.id === removedTaskId)).toBeFalsy();
        });        
    });
})


