import { Component, inject, OnInit } from '@angular/core';
import {MatSnackBarRef} from '@angular/material/snack-bar';
@Component({
  selector: 'app-coustom-alert-material-ui',
  templateUrl: './coustom-alert-material-ui.component.html',
  styleUrls: ['./coustom-alert-material-ui.component.scss']
})


export class CoustomAlertMaterialUiComponent implements OnInit {
  snackBarRef = inject(MatSnackBarRef);
  constructor() { }

  ngOnInit(): void {
  }

}
