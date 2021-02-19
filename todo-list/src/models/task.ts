import TaskData from './taskData';

export default interface Task {
    id: number;
    data: TaskData;
    status: boolean;
}
