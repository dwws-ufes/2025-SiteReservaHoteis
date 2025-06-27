import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-coponent',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register-coponent.html',
  styleUrl: './register-coponent.css'
})
export class RegisterCoponent {

}
