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
export class SwiperMenuComponent implements OnInit, AfterViewInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @HostBinding('class.swiper-container-horizontal') _horizontal: boolean = true;

    @ContentChild(SwiperMenuCenterDirective) center: SwiperMenuCenterDirective;
    @ContentChild(SwiperMenuLeftDirective) left: SwiperMenuLeftDirective;
    @ContentChild(SwiperMenuRightDirective) right: SwiperMenuRightDirective;

    @Input() options: any;
    constructor(
        private el: ElementRef,
        private zone: NgZone,
        private DEF: SwiperConfig,
        private loader: LoaderService,
        public render: Renderer2,
        public cd: ChangeDetectorRef
    ) { }
    /**
     * swiper 实例
     */
    swiper: any;
    private initOptions() {
        this.options = Object.assign({}, this.DEF.options, this.options);
    }
    // 滑动到制定index
    slideToOption: string;
    slideTo(index: number, slideToOption?: string) {
        this.slideToOption = slideToOption;
        if (index < 0) { } else {
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
            this.options = {
                ...this.options,
                ...{
                    initialSlide: this.slideIndex,
                    slidesPerView: 'auto',
                    resistanceRatio: 0,
                    slideToClickedSlide: true,
                    loop: false
                }
            }
            this.swiper = new Swiper(this.el.nativeElement, this.options);
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
    width: number;
    ngAfterViewInit() {
        this.loader.importLocals(['./swiper/js/swiper.min.js']).subscribe(res => {
            this._init();
        });
        this.center.clickBack(res => {
            this.swiper.slideTo(this.slideIndex, 300);
        });
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('options' in changes) {
            this.initOptions();
            if (!changes['options'].firstChange) {
                this._init();
            }
        }
    }
    ngOnDestroy(): void {
        this.destroy();
    }
}