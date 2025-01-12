import {
    trigger,
    transition,
    style,
    animate,
    query,
    group,
    stagger,
    keyframes
  } from '@angular/animations';
  
  export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({ position: 'absolute', width: '100%' })
      ], { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          animate('500ms cubic-bezier(0.17, 0.55, 0.55, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          animate('500ms cubic-bezier(0.17, 0.55, 0.55, 1)', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ], { optional: true })
      ]),
      // Staggered animations for elements within the route component
      query(':enter .stagger-element', [
        stagger('100ms', [
          animate('500ms cubic-bezier(0.17, 0.55, 0.55, 1)', keyframes([
            style({ opacity: 0, transform: 'translateY(50px)', offset: 0 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ])
      ], { optional: true })
    ])
  ]);