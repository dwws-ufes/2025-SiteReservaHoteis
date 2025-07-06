import { Component, OnInit } from '@angular/core';

interface PoolFeature {
  img: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-pool-page',
  templateUrl: './pool-page.component.html',
  styleUrls: ['./pool-page.component.css']
})
export class PoolPageComponent implements OnInit {
  poolFeatures: PoolFeature[] = [
    {
      img: '/assets/imgs/pool/relax-spa.jpg',
      title: 'Relaxation Area',
      description: 'Comfortable loungers and umbrellas by the pool for complete comfort and relaxation.'
    },
    {
      img: '/assets/imgs/pool/pool-bar.jpg',
      title: 'Pool Bar',
      description: 'Refreshing drinks and snacks served right at the water’s edge without leaving the pool.'
    },
    {
      img: '/assets/imgs/pool/kids-pool.jpg',
      title: 'Kids Area',
      description: 'Shallow pool with water toys for safe and fun experiences for children.'
    },
    {
      img: '/assets/imgs/pool/pool-night.jpg',
      title: 'Night Lighting',
      description: 'Underwater lighting effects that create a magical and cozy atmosphere after sunset.'
    }
  ];

  ngOnInit(): void {
    
  }
}
