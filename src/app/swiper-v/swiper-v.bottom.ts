import { Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[swiperBottom]' })
export class SwiperBottomDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public render: Renderer2,
        public ele: ElementRef
    ) { }

    setHeight(val) {
        this.render.setStyle(this.ele.nativeElement, 'height', val);
    }

    show() {
        this.render.addClass(this.ele.nativeElement, 'shown');
    }
}