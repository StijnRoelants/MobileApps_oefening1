export interface ITask {
  name: string;
  id: number;
  done: boolean;
}

export class Task implements ITask {
  done: boolean;
  id: number;
  name: string;

  constructor(obj: ITask) {
    Object.assign(this, obj);
  }

}
