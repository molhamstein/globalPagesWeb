import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ResetPasswordComponent } from '../../../modals/auth/reset-password/reset-password.component';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog,
    private router: Router) { }

  ngAfterViewInit() {
    this.onReset();
  }

  ngOnInit() {
  }

  onReset() {
    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      panelClass: 'communictioDialogStyle',
    });
    dialogRef.afterClosed().subscribe(data => {
      this.router.navigate(['/']);
    });
  }

}
