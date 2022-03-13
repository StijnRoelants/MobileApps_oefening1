export interface ITask {
  name: string;
  id: number;
  done: boolean;
  deadline?: string;
  description: string;
}

export class Task implements ITask {
  done: boolean;
  id: number;
  name: string;
  deadline: string;
  description: string;

  constructor(obj: ITask) {
    Object.assign(this, obj);
  }

}
