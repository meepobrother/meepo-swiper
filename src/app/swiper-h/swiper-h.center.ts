import { Directive, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Directive({ selector: '[swiperCenter]' })
export class SwiperMenuCenterDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    @HostListener('click', ['$event'])
    onClick() {
        this.click$.next();
    }
    click$: Subject<any> = new Subject();
    constructor() { }

    clickBack(call: Function) {
        return this.click$.subscribe(res => {
            call(res);
        });
    }
}
