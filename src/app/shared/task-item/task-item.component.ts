import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../datatypes/tasks';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;

  constructor(public taskService: TaskService, public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {}

}
