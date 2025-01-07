import {
    trigger,
    transition,
    style,
    animate,
    query,
    group
  } from '@angular/animations';
  
  export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({ position: 'relative', width: '100%' })
      ], { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms ease-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          animate('500ms ease-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true })
      ])
    ])
  ]);
  