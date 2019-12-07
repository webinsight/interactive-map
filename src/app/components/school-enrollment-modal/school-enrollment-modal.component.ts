import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-school-enrollment-modal',
  templateUrl: './school-enrollment-modal.component.html',
  styleUrls: ['./school-enrollment-modal.component.scss']
})
export class SchoolEnrollmentModalComponent implements OnInit {
  @Output() closeEmit = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
