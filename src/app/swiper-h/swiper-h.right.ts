import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[swiperRight]' })
export class SwiperMenuRightDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor() { }
}
