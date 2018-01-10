import { Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[swiperBody]' })
export class SwiperBodyDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public render: Renderer2,
        public ele: ElementRef
    ) { }

    setHeight(val, absolute: boolean = false) {
        let height = `calc(100% - ${val}px)`;
        this.render.setStyle(this.ele.nativeElement, 'height', height);
        this.render.setStyle(this.ele.nativeElement, 'min-height', height);
        this.render.setStyle(this.ele.nativeElement, 'max-height', height);
        this.render.setStyle(this.ele.nativeElement, 'transition', '.3s');
    }
}