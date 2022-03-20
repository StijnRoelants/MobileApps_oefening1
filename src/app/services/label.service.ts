import { Injectable } from '@angular/core';
import {Label} from '../../datatypes/label';
import {LabelColor} from '../../datatypes/labelColor';
import {TaskService} from './task.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  labelList: Label[] = [];
  id = 0;

  constructor(private taskService: TaskService) {
    this.labelList.push(new Label({name: 'Dringend', color: LabelColor.danger, id: 0}));
    this.labelList.push(new Label({name: 'Studies', color: LabelColor.primary, id: 1}));
    this.labelList.push(new Label({name: 'Werk', color: LabelColor.secondary, id: 2}));

    this.id = 3;
  }

  getAllLabels(): Label[] {
    return this.labelList.map(l => ({... l}));
  }

  deleteLabel(id): void {
    this.labelList = this.labelList.filter(l => l.id !== id);
    this.taskService.deleteLabelFromTasks(id);
  }
}
