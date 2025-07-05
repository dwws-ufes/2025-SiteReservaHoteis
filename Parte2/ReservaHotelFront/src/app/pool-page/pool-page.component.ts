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
      title: 'Área de Relaxamento',
      description: 'Espreguiçadeiras confortáveis e guarda-sóis à beira da piscina para total conforto e descanso.'
    },
    {
      img: '/assets/imgs/pool/pool-bar.jpg',
      title: 'Pool Bar',
      description: 'Bebidas refrescantes e petiscos servidos diretamente na beira da água, sem precisar sair da piscina.'
    },
    {
      img: '/assets/imgs/pool/kids-pool.jpg',
      title: 'Espaço Kids',
      description: 'Piscina rasa com brinquedos aquáticos para a diversão segura das crianças.'
    },
    {
      img: '/assets/imgs/pool/pool-night.jpg',
      title: 'Iluminação Noturna',
      description: 'Efeitos de luz subaquática que criam um ambiente mágico e acolhedor após o pôr do sol.'
    }
  ];

  ngOnInit(): void {
    // Eventuais inicializações
  }
}
