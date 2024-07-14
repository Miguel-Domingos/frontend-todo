export interface ITask {
  id: number;
  title: string;
  description: string;
  deadline: Date | string;
  status: number;
}
