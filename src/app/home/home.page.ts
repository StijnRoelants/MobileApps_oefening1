import { Component } from '@angular/core';
import { Task } from  'src/datatypes/tasks';
import {AlertController} from '@ionic/angular';;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tasklist: Task[] = [];
  id = 0;
  fabIsVisible = true;
  verticalFabPosition = 'bottom';

  constructor(private alertcontroller: AlertController) {
    for (let i = 0; i < 40; i++) {
      this.tasklist.push(new Task({
        name: 'Task ' + i,
        done: this.id % 2 === 0,
        id: this.id
      }));
      this.id++;
    }
  }

  toggleTaskStatus(id: number): void {
    const task = this.tasklist.find(t => t.id === id);
    task.done = !task.done;
  }

  async presentAlert(): Promise<void> {
    // See the documentation for more info about each attribute.
    // https://ionicframework.com/docs/api/alert
    const alert = await this.alertcontroller.create({
      header: 'New Task',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: (inputs) => {
            this.newTask(inputs.name);
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Task Description'
        }
      ]
    });

    await alert.present();
  }

  newTask(name: string): void {
    this.tasklist.push({
      name,
      id: this.id,
      done: false
    });
    this.id++;
    console.log(this.id);
  }

  deleteTask(id: number): void {
    this.tasklist = this.tasklist.filter(t => t.id !== id);
  }

  scrollStarted(): void {
    this.fabIsVisible = false;
  }

  scrollEnded(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }
}
