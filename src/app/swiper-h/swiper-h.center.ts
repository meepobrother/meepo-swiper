import { Directive, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Directive({ selector: '[swiperCenter]' })
export class SwiperMenuCenterDirective {
    @HostBinding('class.swiper-slide') _slide: boolean = true;
    @HostListener('click', ['$event'])
    onClick() {
        this.click$.next();
    }
    click$: Subject<any> = new Subject();
    constructor() { }

    clickBack(call: any): Subscription {
        return this.click$.subscribe(res => {
            call(res);
        });
    }
}
