import { Component } from '@angular/core';
import {Filter} from '../../datatypes/filter';
import {TaskService} from '../services/task.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fabIsVisible = true;
  verticalFabPosition = 'bottom';
  filters = Object.values(Filter);
  selectedFilter = this.filters[0];

  constructor(public taskService: TaskService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  scrollStarted(): void {
    this.fabIsVisible = false;
  }

  scrollEnded(): void {
    setTimeout(() => this.fabIsVisible = true, 1500);
  }

  changeFilter($event: any) {
    this.selectedFilter = $event.target.value;
  }

}
