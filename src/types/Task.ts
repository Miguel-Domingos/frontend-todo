export interface ITask {
  id: string | number;
  title: string;
  description: string;
  deadline: Date | string;
  status: number;
  users: [];
}
