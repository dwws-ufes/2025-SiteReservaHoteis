import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent {
  name: string = '';
  price: number = 0;
  description: string = '';
  imageUrl: string = '';

  imgName: string = '';

  success = false;

  constructor(
    public dialogRef: MatDialogRef<RoomCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { btnSuccess: string },
    private readonly roomService: RoomService,
    private readonly toastr: ToastrService
  ) {}

  close() {
    this.dialogRef.close(this.success);
  }

  create() {
    let room = {
      name: this.name,
      price: this.price,
      description: this.description,
      imageUrl: this.imageUrl
    };
    this.roomService.createRoom(room)
      .pipe(
        tap(() => {
          this.toastr.success('Quarto criado com sucesso!', 'Sucesso!');
          this.success = true;
          this.close();
        })
      )
      .subscribe();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imgName = file.name;
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.imageUrl = base64String;
      };

      reader.readAsDataURL(file);
    }
  }
}
