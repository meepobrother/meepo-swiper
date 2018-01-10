import { Directive, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({ selector: '[swiperTop]' })
export class SwiperTopDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    constructor(
        public render: Renderer2,
        public ele: ElementRef
    ) { }

    setHeight(val, absolute: boolean = false) {
        let height = `calc(100% - ${val}px)`;
        if (absolute) {
            this.render.setStyle(this.ele.nativeElement, 'margin-bottom', `-${val}px`);
        } else {
            let height = `calc(100% - ${val}px)`;
            this.render.setStyle(this.ele.nativeElement, 'height', height);
            this.render.setStyle(this.ele.nativeElement, 'margin-bottom', `0px`);
        }
        this.render.setStyle(this.ele.nativeElement, 'transition', '.3s');
    }

    show() {
        this.render.addClass(this.ele.nativeElement, 'shown');
    }
}