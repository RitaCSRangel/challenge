import { Component, OnInit } from '@angular/core';
import { SpinnerServiceService } from 'src/app/services/spinnerService/spinner-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(public loader: SpinnerServiceService) { }

  ngOnInit(): void {
  }

}
