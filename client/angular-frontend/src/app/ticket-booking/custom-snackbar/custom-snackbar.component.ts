import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css'],
})
export class CustomSnackbarComponent implements OnInit {
  matIcon!: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data:any ){}

  ngOnInit(): void {
    if(this.data.title == "Error"){
      this.matIcon = "error_outline"
    } else if(this.data.title == "Success"){
      this.matIcon = "check_circle_outline"
    } else if(this.data.title == "Info"){
      this.matIcon = "info_outline"
    }
  }
}
