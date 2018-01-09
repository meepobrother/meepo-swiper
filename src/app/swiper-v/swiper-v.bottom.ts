import { Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[swiperBottom]' })
export class SwiperBottomDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public render: Renderer2,
        public ele: ElementRef
    ) { }

    setHeight(val, absolute: boolean = false) {
        let height = `calc(100% - ${val}px)`;
        if (absolute) {
            this.render.setStyle(this.ele.nativeElement, 'margin-top', `-${val}px`);
        }
        this.render.setStyle(this.ele.nativeElement, 'height', height);
        this.render.setStyle(this.ele.nativeElement, 'transition', '.3s');
    }

    show() {
        this.render.addClass(this.ele.nativeElement, 'shown');
    }
}