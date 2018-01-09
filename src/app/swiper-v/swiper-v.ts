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
import { SwiperBodyDirective } from './swiper-v.body';
import { SwiperTopDirective } from './swiper-v.top';
import { SwiperBottomDirective } from './swiper-v.bottom';

@Component({
    selector: 'swiper-v',
    templateUrl: './swiper-v.html',
    styleUrls: ['./swiper-v.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperVComponent implements OnInit, AfterViewInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @HostBinding('class.swiper-container-vertical') _vertical: boolean = true;

    @ContentChild(SwiperBodyDirective) body: SwiperBodyDirective;
    @ContentChild(SwiperTopDirective) top: SwiperTopDirective;
    @ContentChild(SwiperBottomDirective) bottom: SwiperBottomDirective;
    @Input()
    set offset(val: any) {
        let height = `calc(100% - ${val}px)`;
        this.body && this.body.setHeight(height);
        this.top && this.top.setHeight(height);
        this.bottom && this.bottom.setHeight(height);
    }
    @Input() options: any;
    @Output() init: EventEmitter<any> = new EventEmitter();
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
            if (this.swiper) {
                this.swiper.slideTo(index, 600, false);
            }
        }
    }
    slideIndex: number = 0;
    private getSlideIndex() {
        if (this.top) {
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
                    loop: false,
                    direction: 'vertical',
                    on: {
                        init: () => {
                            this.bottom && this.bottom.show();
                            this.top && this.top.show();
                            this.init.emit(this.swiper);
                        }
                    }
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