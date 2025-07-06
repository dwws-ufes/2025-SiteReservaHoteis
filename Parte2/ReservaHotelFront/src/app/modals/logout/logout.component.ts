import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  success = false;

  constructor(
      public dialogRef: MatDialogRef<LogoutComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { },
      private readonly auth: AuthService
    ) {}

  closeLogoutModal(){
    this.dialogRef.close(this.success);
  }

  confirmLogout(){
    this.auth.cleanUser();
    this.success = true;
    this.closeLogoutModal();
  }
}
