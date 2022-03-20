import { Component, OnInit } from '@angular/core';
import {LabelService} from '../../services/label.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.page.html',
  styleUrls: ['./labels.page.scss'],
})
export class LabelsPage implements OnInit {

  constructor(public labelService: LabelService) { }

  ngOnInit() {
  }

}
