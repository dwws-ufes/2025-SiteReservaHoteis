import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

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
      private readonly toastr: ToastrService,
      private readonly router: Router,
      private readonly userService: UserService,
    ) {}

  closeLogoutModal(){
    this.dialogRef.close(this.success);
  }

  confirmLogout(){
    this.userService.logout();
    this.toastr.success('Successful logout', 'Success!');
    this.router.navigate(['']);
    this.closeLogoutModal();
  }
}
