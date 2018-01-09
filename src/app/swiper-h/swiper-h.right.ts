import { Directive, HostBinding, Renderer2, ElementRef } from '@angular/core';

@Directive({ selector: '[swiperRight]' })
export class SwiperMenuRightDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public ele: ElementRef,
        public render: Renderer2
    ) { }

    show() {
        this.render.addClass(this.ele.nativeElement, 'shown');
    }
}
