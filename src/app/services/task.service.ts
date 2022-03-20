import { Injectable } from '@angular/core';
import {ITask, Task} from 'src/datatypes/tasks';
import {Filter} from '../../datatypes/filter';
import {Label} from '../../datatypes/label';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasklist: Task[] = [];
  id = 0;

  constructor() {
  }

  /* Task Crud's */

  getAllTasks(): Task[] {
    return this.tasklist;
  }

  newTask(name: string, description: string, deadline?: string, labels?: Label[]): void {
    this.tasklist.push({
      deadline,
      name,
      id: this.id,
      done: false,
      description,
      labels
    });
    this.id++;
    console.log(this.id);
  }

  updateTask(updatedTask: ITask): void {
    const task = this.tasklist.find(t => t.id === updatedTask.id);
    if (task === undefined) {
      console.error('trying to update a nonexistent task.');
      return;
    }

    Object.assign(task, updatedTask);
  }

  deleteTask(id: number): void {
    this.tasklist = this.tasklist.filter(t => t.id !== id);
  }

  toggleTaskStatus(id: number): void {
    const task = this.tasklist.find(t => t.id === id);
    task.done = !task.done;
  }

  /* Filters */

  getFilteredTask(filter: Filter): Task[] {
    return this.getAllTasks().filter(t => this.taskMatchesFilter(t, filter));
  }

  private taskMatchesFilter(task: Task, filter: Filter): boolean {
    if (Filter.all === filter) {
      return true;
    }

    return filter === Filter.completed && task.done || filter === Filter.toDo && !task.done;
  }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  getTask(id: number): Task | undefined {
    return this.tasklist.find(t => t.id === id);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  deleteLabelFromTasks(id): void {
    this.tasklist.forEach(t => t.labels = t.labels.filter(l => l.id !== id));
  }
}
