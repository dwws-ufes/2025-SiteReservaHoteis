import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent {
  imgName: string = '';
  room: Room;

  success = false;

  constructor(
    public dialogRef: MatDialogRef<RoomEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { room: Room, btnSuccess: string, btnDelete: string },
    private readonly roomService: RoomService,
    private readonly toastr: ToastrService
  ) {
    this.room = {
      id: data.room.id,
      name: data.room.name,
      description: data.room.description,
      price: data.room.price,
      imageUrl: data.room.imageUrl
    }
  }

  close() {
    this.dialogRef.close(this.success);
  }

  edit() {
    this.roomService.editRoom(this.room)
      .pipe(
        tap(() => {
          this.toastr.success('Quarto atualizado com sucesso!', 'Sucesso!');
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
        this.room.imageUrl = base64String;
      };

      reader.readAsDataURL(file);
    }
  }

  delete() {
    this.roomService.deleteRoom(this.room.id)
      .pipe(
        tap(() => {
          this.toastr.success('Quarto removido com sucesso!', 'Sucesso!');
          this.success = true;
          this.close();
        })
      )
      .subscribe()
  }
}
