
import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[swiperLeft]' })
export class SwiperMenuLeftDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor() { }
}
