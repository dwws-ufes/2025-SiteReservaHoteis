import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-coponent',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login-coponent.html',
  styleUrl: './login-coponent.css'
})
export class LoginCoponent {

}
