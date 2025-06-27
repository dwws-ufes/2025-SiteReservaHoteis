import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-page-coponent',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-page-coponent.html',
  styleUrl: './user-page-coponent.css'
})
export class UserPageCoponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(pm => {
      const userId = Number(pm.get('userid'));
      // if (!userId) {
      //   this.router.navigate(['/']);
      //   return;
      // }
    });
  }
}
