import {
    Component, OnInit,
    ViewEncapsulation, HostBinding, ElementRef,
    ContentChild, TemplateRef, Input, AfterContentInit
} from '@angular/core';
import { LoaderService } from 'meepo-loader';
declare const Swiper: any;
@Component({
    selector: 'swiper',
    templateUrl: './swiper.html',
    styleUrls: ['./swiper.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SwiperComponent implements AfterContentInit {
    @HostBinding('class.swiper-container') _container: boolean = true;
    @ContentChild('ref') _ref: TemplateRef<any>;
    swiper: any;
    @Input() items: any[] = [];
    constructor(
        public loader: LoaderService,
        public ele: ElementRef
    ) { }

    ngAfterContentInit() {
        this.loader.importLocals(['./js/swiper.min.js']).subscribe(res => {
            this.swiper = new Swiper(this.ele.nativeElement);
        });
    }


}
