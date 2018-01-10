import { SwiperConfig } from './swiper.config';
import {
    Component, ViewEncapsulation, Input, OnChanges,
    SimpleChanges, OnDestroy, EventEmitter, Output,
    ElementRef, OnInit, AfterViewInit, Renderer2,
    HostBinding, ContentChild, TemplateRef, ChangeDetectorRef,
    ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { LoaderService } from 'meepo-loader';
import { Subject } from 'rxjs/Subject';
declare const Swiper: any;
@Component({
    selector: 'swiper',
    templateUrl: './swiper.html',
    styleUrls: ['./swiper.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwiperComponent implements AfterViewInit, OnChanges, OnInit, OnDestroy {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @ContentChild(TemplateRef) _ref: TemplateRef<any>;

    refresh: any;
    loadmore: any;

    _options: any;
    @Input()
    set options(val: any) {
        this._options = val;
        if (this._options.direction === 'vertical') {
            this.vertical = 'vertical';
        } else {
            this.horizontal = 'horizontal';
        }
    }
    get options() {
        return this._options;
    }
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

    @Output() down: EventEmitter<any> = new EventEmitter();
    @Output() up: EventEmitter<any> = new EventEmitter();



    @Input() auto: boolean = true;
    constructor(
        private el: ElementRef,
        private DEF: SwiperConfig,
        private loader: LoaderService,
        public render: Renderer2,
        public cd: ChangeDetectorRef
    ) {
        this.down$.subscribe(res => {
            this.refresh.html('加载完毕');
            setTimeout(() => {
                this.swiper.touchEventsData.isTouched = true;
                this.swiper.allowTouchMove = true;
                this.swiper.params.virtualTranslate = false;
                this.swiper.setTranslate(0);
            }, 600);
        });
        this.up$.subscribe(res => {
            this.loadmore.html('加载完毕');
            setTimeout(() => {
                this.swiper.allowTouchMove = true;
                this.swiper.params.virtualTranslate = false;
                this.swiper.setTranslate(0);
            }, 600);
        });
    }
    /**
     * swiper 实例
     */
    swiper: any;
    private initOptions() {
        this.options = Object.assign({}, this.DEF.options, this.options);
    }
    // 滑动到制定index
    slideToOption: string;
    down$: Subject<any> = new Subject();
    up$: Subject<any> = new Subject();
    isDown: string = '';

    slideTo(index: number, slideToOption?: string) {
        this.slideToOption = slideToOption;
        if (index < 0) { } else {
            this.swiper.slideTo(index, 600, false);
        }
    }
    public _init(reinit: boolean = false) {
        let that = this;
        if (this.auto || reinit) {
            this.destroy();
            this.options = {
                ...{
                    speed: 300,
                    slidesPerView: 'auto',
                    freeMode: true,
                    direction: 'vertical',
                    setWrapperSize: true,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
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
                        touchMove: function () {
                            that.touchMove.emit(this.swiper);
                        },
                        touchEnd: () => {
                            if (this.isDown === 'down') {
                                this.refresh.html('<i class="weui-loading"></i>刷新中...');
                                this.down.emit(this.down$);
                            }
                            if (this.isDown === 'up') {
                                this.loadmore.html('<i class="weui-loading"></i>加载中...');
                                this.up.emit(this.up$);
                            }
                            this.touchEnd.emit(that.swiper);
                        },
                        momentumBounce: function () {
                            this.allowTouchMove = true;
                            this.params.virtualTranslate = false;
                        }
                    }
                },
                ...this.options
            }
            this.swiper = new Swiper(this.el.nativeElement, this.options);
            this.init.next(this.swiper);
        }
    }
    private destroy() {
        if (this.swiper) {
            this.swiper.destroy(true, false);
            this.swiper = null;
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
