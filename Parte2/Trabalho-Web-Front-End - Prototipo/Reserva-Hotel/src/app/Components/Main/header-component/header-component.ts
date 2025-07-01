import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent implements OnInit {
  showPreloader = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simula preloader até a primeira rota carregar
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        setTimeout(() => this.showPreloader = false, 500);
      }
    });
  }
}