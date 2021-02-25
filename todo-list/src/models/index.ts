export interface TaskType {
  taskType: string,
  listTitle: string
}

export interface TaskData {
  title: string;
  description: string;
}
  
export interface Task {
  id: number;
  data: TaskData;
  status: boolean;
}