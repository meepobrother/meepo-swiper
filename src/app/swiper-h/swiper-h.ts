import {
    Component, OnInit,
    ViewEncapsulation, HostBinding,
    SimpleChanges, Input, EventEmitter, Output,
    ElementRef, NgZone, Renderer2, ChangeDetectorRef,
    ContentChild, AfterViewInit
} from '@angular/core';
import { SwiperConfig } from '../swiper/swiper.config';
declare const Swiper: any;
import { LoaderService } from 'meepo-loader';

import { SwiperMenuCenterDirective } from './swiper-h.center';
import { SwiperMenuLeftDirective } from './swiper-h.left';
import { SwiperMenuRightDirective } from './swiper-h.right';

@Component({
    selector: 'swiper-h',
    templateUrl: './swiper-h.html',
    styleUrls: ['./swiper-h.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperHComponent implements OnInit, AfterViewInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @HostBinding('class.swiper-container-horizontal') _horizontal: boolean = true;

    @ContentChild(SwiperMenuCenterDirective) center: SwiperMenuCenterDirective;
    @ContentChild(SwiperMenuLeftDirective) left: SwiperMenuLeftDirective;
    @ContentChild(SwiperMenuRightDirective) right: SwiperMenuRightDirective;
    @Input()
    set offset(val: any) {
        let width = `calc(100% - ${val}px)`;
        this.left && this.left.setWidth(width);
        this.right && this.right.setWidth(width);
    }
    @Input()
    set width(val: string) {
        this.left && this.left.setWidth(val);
        this.right && this.right.setWidth(val);
    }
    @Input() options: any;

    @Output() init: EventEmitter<any> = new EventEmitter();

    /**
     * swiper 实例
     */
    swiper: any;
    constructor(
        private el: ElementRef,
        private zone: NgZone,
        private DEF: SwiperConfig,
        private loader: LoaderService,
        public render: Renderer2,
        public cd: ChangeDetectorRef
    ) { }


    private initOptions() {
        this.options = Object.assign({}, this.DEF.options, this.options);
    }
    // 滑动到制定index
    slideToOption: string;
    slideTo(index: number) {
        if (this.swiper) {
            this.swiper.slideTo(index, 600, false);
        }
    }
    slideIndex: number = 0;
    private getSlideIndex() {
        if (this.left) {
            this.slideIndex = 1;
        }
    }
    public _init() {
        this.destroy();
        this.zone.runOutsideAngular(() => {
            this.getSlideIndex();
            const that = this;
            this.options = {
                ...this.options,
                ...{
                    initialSlide: this.slideIndex,
                    slidesPerView: 'auto',
                    resistanceRatio: 0,
                    slideToClickedSlide: true,
                    loop: false,
                    on: {
                        init: function () {
                            that.left.show();
                            that.right.show();
                        }
                    }
                }
            }
            this.swiper = new Swiper(this.el.nativeElement, this.options);
            this.init.emit(this.swiper);
        });
    }
    private destroy() {
        if (this.swiper) {
            this.zone.runOutsideAngular(() => {
                this.swiper.destroy(true, false);
                this.swiper = null;
            });
        }
    }
    ngOnInit() {
        if (!this.options) this.initOptions();
    }
    ngAfterViewInit() {

        this.center.clickBack(res => {
            this.swiper.slideTo(this.slideIndex, 300);
        });
    }
    __init() {
        if (window['Swiper']) {
            this._init();
        } else {
            this.loader.importLocals(['./swiper/js/swiper.min.js']).subscribe(res => {
                this._init();
            });
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('options' in changes) {
            this.initOptions();
            if (!changes['options'].firstChange) {
                this.__init();
            }
        }
    }
    ngOnDestroy(): void {
        this.destroy();
    }
}