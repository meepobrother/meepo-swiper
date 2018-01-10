import {
    Component, OnInit,
    ViewEncapsulation, HostBinding,
    SimpleChanges, Input, EventEmitter, Output,
    ElementRef, NgZone, Renderer2, ChangeDetectorRef,
    ContentChild, AfterViewInit, TemplateRef, ViewChild
} from '@angular/core';
import { SwiperConfig } from '../swiper/swiper.config';
declare const Swiper: any;
import { LoaderService } from 'meepo-loader';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'swiper-scroll',
    templateUrl: './swiper-scroll.html',
    styleUrls: ['./swiper-scroll.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperScrollComponent implements OnInit, AfterViewInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @HostBinding('class.swiper-container-horizontal') _horizontal: boolean = true;
    @ContentChild(TemplateRef) _ref: TemplateRef<any>;

    @Input() options: any;

    items: any[] = [];
    @Output() init: EventEmitter<any> = new EventEmitter();

    @Output() up: EventEmitter<any> = new EventEmitter();
    @Output() down: EventEmitter<any> = new EventEmitter();
    up$: Subject<any> = new Subject();
    down$: Subject<any> = new Subject();

    /**
     * swiper 实例
     */
    swiper: any;
    refresh: any;
    loadmore: any;
    isDown: string;
    constructor(
        private el: ElementRef,
        private zone: NgZone,
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
                this.refresh.html('下拉刷新');
                this.swiper.setTranslate(0);
            }, 600);
        });
        this.up$.subscribe(res => {
            this.loadmore.html('加载完毕');
            this.swiper.allowTouchMove = true;
            this.swiper.params.virtualTranslate = false;
            this.loadmore.html('上拉加载');
        });
    }


    private initOptions() {
        this.options = Object.assign({}, this.DEF.options, this.options);
    }
    // 滑动到制定index
    slideToOption: string;
    slideTo(index: number) {
        if (this.swiper) {
            this.swiper.slideTo(index, 300, false);
        }
    }
    slideIndex: number = 0;
    setItems(val: any[]) {
        if (val) {
            this.items = val;
            this.cd.detectChanges();
        }
    }
    public _init() {
        this.destroy();
        let that = this;
        this.zone.runOutsideAngular(() => {
            this.options = {
                ...this.options,
                ...{
                    speed: 300,
                    slidesPerView: 'auto',
                    freeMode: true,
                    direction: 'vertical',
                    observer: true,
                    observeParents: true,
                    freeModeMomentumBounce: true,
                    freeModeMomentum: true,
                    on: {
                        touchStart: () => {
                            that.refresh.html('松开刷新');
                        },
                        touchMove: function () {
                            that.refresh.html('松开刷新');
                        },
                        reachEnd: function () {
                            if (this.isDown != 'up') {
                                that.swiper.allowTouchMove = false;
                                that.swiper.params.virtualTranslate = true;
                                that.isDown = 'up';
                                that.up.emit(that.up$);
                            }
                        },
                        touchEnd: function () {
                            if (this.isDown != 'down' || this.isDown != 'up') {
                                that.refresh.html('加载完毕');
                                that.loadmore.html('没有更多了');
                            }
                            if (this.isDown != 'down') {
                                if (this.translate > 80) {
                                    this.setTransition(this.params.seed);
                                    this.setTranslate(80);
                                    that.swiper.touchEventsData.isTouched = false;
                                    that.swiper.allowTouchMove = false;
                                    that.refresh.html('<i class="weui-loading"></i>刷新中...');
                                    that.isDown = 'down';
                                    that.down.emit(that.down$);
                                }
                            }
                        }
                    }
                },
            }
            this.swiper = new Swiper(this.el.nativeElement, this.options);
            this.init.emit(this.swiper);
            this.refresh = this.swiper.$el.find('.refresh');
            this.loadmore = this.swiper.$el.find('.loadmore');
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
                this.__init();
            }
        }
    }
    ngOnDestroy(): void {
        this.destroy();
    }
}