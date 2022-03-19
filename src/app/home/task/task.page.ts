import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  done: boolean;
  taskName: string;
  yearValues: number[] = [];
  deadline: string;
  description: string;
  id?: number = undefined;
  pageName = 'test';

  constructor(public navController: NavController, public taskService: TaskService, public activatedRoute: ActivatedRoute){
    const currentYear: number = (new Date()).getFullYear();
    for (let year = currentYear; year < (currentYear + 50); year++) {
      this.yearValues.push(year);
    }
  }

  ngOnInit(): void {
    this.setData();
  }

  setData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id === null) {
      this.pageName = 'New Task';
      return;
    }
    this.pageName = 'Edit Task';
    this.id = Number(id);

    const task = this.taskService.getTask(this.id);
    this.taskName = task.name;
    this.deadline = task.deadline;
    this.description = task.description;
    this.done = task.done;

  }

  createTask(): void {
    this.taskService.newTask(this.taskName, this.description, this.deadline);
  }

  updateTask(): void {
    this.taskService.updateTask({
      id: this.id,
      name: this.taskName,
      deadline: this.deadline,
      description: this.description,
      done: this.done
    });
  }

  handleCreateAndUpdate(): void {
    if (this.id === undefined) {
      this.createTask();
    } else {
      this.updateTask();
    }
    this.navController.back();
  }
}
