import { Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[swiperBody]' })
export class SwiperBodyDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public render: Renderer2,
        public ele: ElementRef
    ) { }

    setHeight(val) {
        this.render.setStyle(this.ele.nativeElement, 'height', val);
        this.render.setStyle(this.ele.nativeElement, 'transition', '1s');
    }
}