import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent{

  imgName: string = '';
  user : User;

  success = false;

  constructor(
        private userService: UserService,
        public dialogRef: MatDialogRef<UserEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: User, btnSuccess: string, btnDelete: string },
        private readonly toastr: ToastrService
  ) {
    this.user = {
      id: data.user.id,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      password: data.user.password,
      avatar: data.user.avatar
    }
  }

  close(){
    this.dialogRef.close(this.success);
  }

  edit() {
      // this.userService.editUser(this.user.id)
      //   .pipe(
      //     tap(() => {
      //       this.toastr.success('User atualizado com sucesso!', 'Sucesso!');
      //       this.success = true;
      //       this.close();
      //     })
      //   )
      //   .subscribe();
    }
  
    onFileSelected(event: Event) {
      const input = event.target as HTMLInputElement;
  
      if (input.files && input.files[0]) {
        const file = input.files[0];
        this.imgName = file.name;
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.user.avatar = base64String;
        };
  
        reader.readAsDataURL(file);
      }
    }
}
