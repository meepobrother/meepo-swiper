import { Component, OnInit, Input, EventEmitter, Output, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'swiper-layout',
    templateUrl: 'swiper-layout.html',
    styleUrls: ['./swiper-layout.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperLayoutComponent implements AfterContentInit {
    @Input() offset: any = 240;
    @Output() open: EventEmitter<string> = new EventEmitter();
    @Output() init: EventEmitter<any> = new EventEmitter();
    onOpen$: Subject<string> = new Subject();
    open$: Subject<string> = new Subject();

    @Input() hasLeft: boolean = true;
    @Input() hasRight: boolean = true;
    @Input() hasTop: boolean = true;
    @Input() hasBottom: boolean = true;

    hSwiper: any;
    vSwiper: any;
    constructor() {
        this.onOpen$.subscribe(res => {
            this.open.emit(res);
        });
        this.open$.subscribe(res => {
            if (res === 'center') {
                this.toCenter();
            }
            if (res === 'body') {
                this.toBody();
            }
            if (res === 'left') {
                this.toLeft();
            }
            if (res === 'right') {
                this.toRight();
            }
            if (res === 'top') {
                this.toTop();
            }
            if (res === 'bottom') {
                this.toBottom();
            }
        });
    }
    ngAfterContentInit() {
        this.init.emit(this.open$);
    }

    update() {
        this.hSwiper && this.hSwiper.update();
        this.vSwiper && this.vSwiper.update();
    }

    onVInit(e: any) {
        if (e) {
            this.vSwiper = e;
        }
    }
    onHInit(e: any) {
        if (e) {
            this.hSwiper = e;
        }
    }

    onHEnd(e: any) {
        this.hSwiper = e;
        if (e) {
            if (e.isEnd) {
                if (this.hasRight) {
                    this.open$.next('right');
                } else {
                    this.open$.next('center');
                }
            } else if (e.isBeginning) {
                if (this.hasLeft) {
                    this.open$.next('left');
                }else{
                    this.open$.next('center');
                }
            } else {
                this.open$.next('center');
            }
        }
    }
    onVEnd(e: any) {
        this.vSwiper = e;
        if (e) {
            if (e.isEnd) {
                if (this.hasBottom) {
                    this.open$.next('bottom');
                } else {
                    this.open$.next('body');
                }
            } else if (e.isBeginning) {
                if (this.hasTop) {
                    this.open$.next('top');
                }else{
                    this.open$.next('body');
                }
            } else {
                this.open$.next('body');
            }
        }
    }

    toMain() {
        if (!this.isHCenter()) {
            this.toCenter();
        }
        if (!this.isVCenter()) {
            this.toBody();
        }
    }

    isHCenter() {
        if (this.hSwiper.isBeginning || this.hSwiper.isEnd) {
            return false;
        }
        return true;
    }

    isVCenter() {
        if (this.vSwiper.isBeginning || this.vSwiper.isEnd) {
            return false;
        }
        return true;
    }

    toCenter() {
        if (this.hasLeft) {
            this.hSwiper.slideTo(1, 300, false);
        } else {
            this.hSwiper.slideTo(0, 300, false);
        }
    }

    toLeft() {
        if (this.hasLeft) {
            this.hSwiper.slideTo(0, 300, false);
        }
    }

    toRight() {
        if (this.hasRight) {
            if (this.hasLeft) {
                this.hSwiper.slideTo(2, 300, false);
            } else {
                this.hSwiper.slideTo(1, 300, false);
            }
        }
    }

    toBody() {
        if (this.hasTop) {
            this.vSwiper.slideTo(1, 300, false);
        } else {
            this.vSwiper.slideTo(0, 300, false);
        }
    }

    toTop() {
        if (this.hasLeft) {
            this.vSwiper.slideTo(0, 300, false);
        }
    }

    toBottom() {
        if (this.hasBottom) {
            if (this.hasTop) {
                this.vSwiper.slideTo(2, 300, false);
            } else {
                this.vSwiper.slideTo(1, 300, false);
            }
        }
    }
}