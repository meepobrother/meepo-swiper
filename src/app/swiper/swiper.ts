import { SwiperConfig } from './swiper.config';
import {
    Component, ViewEncapsulation, Input, OnChanges,
    SimpleChanges, OnDestroy, EventEmitter, Output,
    ElementRef, NgZone, OnInit, AfterViewInit, Renderer2,
    HostBinding, ContentChild, TemplateRef, ChangeDetectorRef
} from '@angular/core';
import { LoaderService } from 'meepo-loader';
declare const Swiper: any;
@Component({
    selector: 'swiper',
    templateUrl: './swiper.html',
    styleUrls: ['./swiper.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @ContentChild(TemplateRef) _ref: TemplateRef<any>;

    @Input() options: any;
    @Input()
    set horizontal(val: any) {
        this.render.removeClass(this.el.nativeElement, 'swiper-container-vertical');
        this.render.addClass(this.el.nativeElement, 'swiper-container-horizontal');
    }
    @Input()
    set vertical(val: any) {
        this.render.removeClass(this.el.nativeElement, 'swiper-container-horizontal');
        this.render.addClass(this.el.nativeElement, 'swiper-container-vertical');
    }
    @Input() items: any[] = [];
    // 监听改变
    @Output() slideChange: EventEmitter<any> = new EventEmitter();
    @Output() slideChangeTransitionStart: EventEmitter<any> = new EventEmitter();
    @Output() slideChangeTransitionEnd: EventEmitter<any> = new EventEmitter();
    @Output() sliderMove: EventEmitter<any> = new EventEmitter();
    @Output() reachBeginning: EventEmitter<any> = new EventEmitter();
    @Output() reachEnd: EventEmitter<any> = new EventEmitter();
    @Output() slideNextTransitionStart: EventEmitter<any> = new EventEmitter();
    @Output() slideNextTransitionEnd: EventEmitter<any> = new EventEmitter();

    @Output() slidePrevTransitionStart: EventEmitter<any> = new EventEmitter();
    @Output() slidePrevTransitionEnd: EventEmitter<any> = new EventEmitter();

    @Output() init: EventEmitter<any> = new EventEmitter();
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    @Output() onTap: EventEmitter<any> = new EventEmitter();
    @Output() doubleTap: EventEmitter<any> = new EventEmitter();

    @Output() progress: EventEmitter<any> = new EventEmitter();
    @Output() touchStart: EventEmitter<any> = new EventEmitter();
    @Output() touchMove: EventEmitter<any> = new EventEmitter();
    @Output() touchEnd: EventEmitter<any> = new EventEmitter();
    @Output() realIndex: EventEmitter<any> = new EventEmitter();


    @Input() auto: boolean = true;
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
    public _init(reinit: boolean = false) {
        if (this.auto || reinit) {
            this.destroy();
            this.zone.runOutsideAngular(() => {
                this.options = {
                    ...this.options,
                    ...{
                        on: {
                            slideChange: () => {
                                this.slideChange.emit(this.swiper);
                            },
                            slideChangeTransitionStart: () => {
                                this.slideChangeTransitionStart.emit(this.swiper);
                            },
                            slideChangeTransitionEnd: () => {
                                this.slideChangeTransitionEnd.emit(this.swiper);
                            },
                            sliderMove: () => {
                                this.sliderMove.emit(this.swiper);

                            },
                            reachBeginning: () => {
                                this.reachBeginning.emit(this.swiper);
                            },
                            reachEnd: () => {
                                this.reachEnd.emit(this.swiper);
                            },
                            slideNextTransitionStart: () => {
                                this.slideNextTransitionStart.emit(this.swiper);
                            },
                            slideNextTransitionEnd: () => {
                                this.slideNextTransitionEnd.emit(this.swiper);
                            },
                            slidePrevTransitionStart: () => {
                                this.slidePrevTransitionStart.emit(this.swiper);
                            },
                            slidePrevTransitionEnd: () => {
                                this.slidePrevTransitionEnd.emit(this.swiper);
                            },
                            init: () => {
                                this.init.emit(this.swiper);
                            },
                            click: () => {
                                this.onClick.emit(this.swiper);
                            },
                            tap: () => {
                                this.onTap.emit(this.swiper);
                            },
                            doubleTap: () => {
                                this.doubleTap.emit(this.swiper);
                            },
                            progress: () => {
                                this.progress.emit(this.swiper);
                            },
                            touchStart: () => {
                                this.touchStart.emit(this.swiper);
                            },
                            touchMove: () => {
                                this.touchMove.emit(this.swiper);
                            },
                            touchEnd: () => {
                                this.touchMove.emit(this.swiper);
                            }
                        }
                    }
                }
                this.swiper = new Swiper(this.el.nativeElement, this.options);
                this.init.next(this.swiper);
            });
        }
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
        this.__init();
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
                this._init();
            }
        }
    }
    ngOnDestroy(): void {
        this.destroy();
    }
}
