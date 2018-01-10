import {
    Component, OnInit,
    ViewEncapsulation, HostBinding,
    SimpleChanges, Input, EventEmitter, Output,
    ElementRef, NgZone, Renderer2, ChangeDetectorRef,
    ContentChild, AfterViewInit, AfterContentInit
} from '@angular/core';
import { SwiperConfig } from '../swiper/swiper.config';
declare const Swiper: any;
import { LoaderService } from 'meepo-loader';

@Component({
    selector: 'swiper-wrap',
    templateUrl: './swiper-wrap.html',
    styleUrls: ['./swiper-wrap.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperWrapComponent implements OnInit, AfterContentInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @HostBinding('class.swiper-container-vertical') _vertical: boolean = true;
    _offset: any;
    @Input()
    set offset(val: any) {
        if (val) {
            this._offset = val;
            this.changeEleStyle();
        }
    }
    _absolute: boolean = true;
    @Input()
    set absolute(val: boolean) {
        this._absolute = val;
        this.changeEleStyle();
    }
    get absolute() {
        return this._absolute;
    }
    @Input() options: any;
    @Output() init: EventEmitter<any> = new EventEmitter();
    @Output() slideChange: EventEmitter<any> = new EventEmitter();
    @Output() onEnd: EventEmitter<any> = new EventEmitter();

    /**
     * swiper 实例
     */
    swiper: any;
    constructor(
        private el: ElementRef,
        private DEF: SwiperConfig,
        private loader: LoaderService,
        public render: Renderer2,
        public cd: ChangeDetectorRef
    ) { }

    private changeEleStyle() {
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
    public _init() {
        this.destroy();
        this.options = {
            ...{
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                mousewheel: true,
            },
            ...this.options
        }
        this.swiper = new Swiper(this.el.nativeElement, this.options);
        this.init.emit(this.swiper);
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
    __init() {
        if (window['Swiper']) {
            this._init();
        } else {
            this.loader.importLocals(['./swiper/js/swiper.min.js']).subscribe(res => {
                this._init();
            });
        }
    }
    width: number;
    ngAfterContentInit() {
        this.__init();
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