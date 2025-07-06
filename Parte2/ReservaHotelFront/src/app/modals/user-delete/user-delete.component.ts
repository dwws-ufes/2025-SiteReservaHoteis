import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {

  user: User;
  success = false;

  constructor(
      public dialogRef: MatDialogRef<UserDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { user: User, btnSuccess: string, btnDelete: string },
      private userService: UserService,
      private readonly toastr: ToastrService
    ) {
    this.user = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: data.user.password,
      avatar: data.user.avatar,
      isAdmin: data.user.isAdmin
    }
  }

  close() {
    this.dialogRef.close(this.success);
  }

  delete() {
      this.userService.deleteUser(this.user.id)
        .pipe(
          tap(() => {
            this.toastr.success('User Deletado com sucesso!', 'Sucesso!');
            this.success = true;
            this.close();
          })
        )
        .subscribe()
    }
}
