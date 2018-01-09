import { Component, OnInit, ViewChild, ElementRef, Input, TemplateRef, ContentChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'swiper-tabs',
    templateUrl: './swiper-tabs.html',
    styleUrls: ['./swiper-tabs.scss'],
    encapsulation: ViewEncapsulation.None
})

export class SwiperTabsComponent implements OnInit {
    @ViewChild('header') header: ElementRef;
    @ContentChild(TemplateRef) _ref: TemplateRef<any>;

    @Input() tabs: any[] = [];
    constructor() { }
    ngOnInit() { }

    mainHeight: string;
    ngAfterViewInit() {
        let height = this.header.nativeElement.clientHeight;
        this.mainHeight = `calc( 100% - ${height}px)`;
    }

    footerOptions: any = {
        loop: false,
        preventLinksPropagation: true,
        controller: {
            control: [],
            inverse: true,
            by: 'slide',
        },
        initialSlide: 0,
        centeredSlides: true
    };

    mainOptions: any = {
        loop: false,
        controller: {
            control: [],
            inverse: true,
            by: 'slide',
        }
    }

    mainCtrl: any;
    footerCtrl: any;
    from: string = 'footer';

    initMain(e) {
        if (e) {
            this.mainCtrl = e;
        }
    }

    initFooter(e) {
        if (e) {
            this.footerCtrl = e;
        }
    }

    touchStartFooter(e: any) {
        this.from = 'footer';
    }

    touchStartMain(e: any) {
        this.from = 'main';
    }
    // 底部菜单改变
    doFooterItem(e) {
        if (e) {
            if (this.from === 'footer') {
                this.mainCtrl.slideTo(e.activeIndex);
            }
        }
    }
    // 主体改变
    doMainItem(e: any) {
        if (e) {
            if (this.from === 'main') {
                this.footerCtrl.slideTo(e.activeIndex);
            }
        }
    }
}