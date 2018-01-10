import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'swiper-layout',
    templateUrl: 'swiper-layout.html',
    styleUrls: ['./swiper-layout.scss']
})
export class SwiperLayoutComponent implements OnInit {
    @Input() offset: any = 240;
    @Output() open: EventEmitter<string> = new EventEmitter();
    @Output() init: EventEmitter<any> = new EventEmitter();
    onOpen$: Subject<string> = new Subject();
    open$: Subject<string> = new Subject();

    hSwiper: any;
    vSwiper: any;
    constructor() {
        this.onOpen$.subscribe(res => {
            this.open.emit(res);
        });
        this.open$.subscribe(res => {
            if (res === 'center' || res === 'main') {
                this.toMain();
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
    ngOnInit() {
        this.init.emit(this.open$);
    }

    update(){
        this.hSwiper && this.hSwiper.update();
        this.vSwiper && this.vSwiper.update();
    }

    onHEnd(e: any) {
        this.hSwiper = e;
        console.log('h swiper inited');
        if (e) {
            if (e.isEnd) {
                this.open$.next('right');
            } else if (e.isBeginning) {
                this.open$.next('left');
            } else {
                this.open$.next('center');
            }
        }
    }
    onVEnd(e: any) {
        this.vSwiper = e;
        console.log('v swiper inited');
        if (e) {
            if (e.isEnd) {
                this.open$.next('bottom');
            } else if (e.isBeginning) {
                this.open$.next('top');
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
        this.hSwiper.slideTo(1, 300, false);
    }

    toLeft() {
        this.hSwiper.slideTo(0, 300, false);
    }

    toRight() {
        this.hSwiper.slideTo(2, 300, false);
    }

    toBody() {
        this.vSwiper.slideTo(1, 300, false);
    }

    toTop() {
        this.vSwiper.slideTo(0, 300, false);
    }

    toBottom() {
        this.vSwiper.slideTo(2, 300, false);
    }
}