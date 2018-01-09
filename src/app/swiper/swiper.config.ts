import { Injectable } from '@angular/core';

@Injectable()
export class SwiperConfig {
    constructor() { }
    options: any = {
        loop: false,
        pagination: {
            el: '.swiper-pagination',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
        }
    };
}
