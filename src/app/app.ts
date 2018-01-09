import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper/swiper';
import { SwiperTabsComponent } from './swiper-tabs/swiper-tabs';
import { SwiperMenuComponent } from './swiper-h/swiper-h';
import { SwiperVComponent } from './swiper-v/swiper-v';
import { SwiperBodyDirective } from './swiper-v/swiper-v.body';
import { SwiperBottomDirective } from './swiper-v/swiper-v.bottom';
import { SwiperTopDirective } from './swiper-v/swiper-v.top';


import { SwiperMenuCenterDirective } from './swiper-h/swiper-h.center';
import { SwiperMenuLeftDirective } from './swiper-h/swiper-h.left';
import { SwiperMenuRightDirective } from './swiper-h/swiper-h.right';


import { SwiperConfig } from './swiper/swiper.config';

import { LoaderModule } from 'meepo-loader';
import { EventModule } from 'meepo-event';

@NgModule({
    imports: [
        CommonModule,
        LoaderModule.forRoot({
            root: './assets/meepo.libs/'
        }),
        EventModule.forRoot()
    ],
    exports: [
        SwiperComponent,
        SwiperTabsComponent,
        SwiperMenuComponent,
        SwiperMenuCenterDirective,
        SwiperMenuLeftDirective,
        SwiperMenuRightDirective,
        SwiperVComponent,
        SwiperBodyDirective,
        SwiperBottomDirective,
        SwiperTopDirective
    ],
    declarations: [
        SwiperComponent,
        SwiperTabsComponent,
        SwiperMenuComponent,
        SwiperMenuCenterDirective,
        SwiperMenuLeftDirective,
        SwiperMenuRightDirective,
        SwiperVComponent,
        SwiperBodyDirective,
        SwiperBottomDirective,
        SwiperTopDirective
    ],
    providers: [

    ],
})
export class SwiperModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SwiperModule,
            providers: [
                {
                    provide: SwiperConfig,
                    useClass: SwiperConfig
                }
            ]
        }
    }
}

export { SwiperComponent } from './swiper/swiper';
export { SwiperConfig } from './swiper/swiper.config';