import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {LabelService} from "../../services/label.service";
import {Label} from "../../../datatypes/label";

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
  labels = this.labelService.getAllLabels();
  selectedLabels: boolean[] = Array(this.labels.length).fill(false);

  constructor(public navController: NavController, public taskService: TaskService, public activatedRoute: ActivatedRoute,
  public labelService: LabelService){
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
    this.selectedLabels = this.labels.map(l => !! task.labels.find(l2=> l2.id === l.id));
  }

  createTask(): void {
    this.taskService.newTask(this.taskName, this.description, this.deadline, this.getSelectedLabels());
  }

  updateTask(): void {
    this.taskService.updateTask({
      id: this.id,
      name: this.taskName,
      deadline: this.deadline,
      description: this.description,
      done: this.done,
      labels: this.getSelectedLabels()
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

  getSelectedLabels(): Label[] {
    return this.labels.filter((l, i) => this.selectedLabels[i]);
  }
}
