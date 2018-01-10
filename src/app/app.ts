import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper/swiper';
import { SwiperTabsComponent } from './swiper-tabs/swiper-tabs';

import { SwiperHComponent } from './swiper-h/swiper-h';
import { SwiperVComponent } from './swiper-v/swiper-v';
import { SwiperScrollComponent } from './swiper-scroll/swiper-scroll';


import { SwiperBodyDirective } from './swiper-v/swiper-v.body';
import { SwiperBottomDirective } from './swiper-v/swiper-v.bottom';
import { SwiperTopDirective } from './swiper-v/swiper-v.top';
import { SwiperLayoutComponent } from './swiper-layout/swiper-layout';
import { SwiperWrapComponent } from './swiper-wrap/swiper-wrap';



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
        SwiperHComponent,
        SwiperMenuCenterDirective,
        SwiperMenuLeftDirective,
        SwiperMenuRightDirective,
        SwiperVComponent,
        SwiperBodyDirective,
        SwiperBottomDirective,
        SwiperTopDirective,
        SwiperScrollComponent,
        SwiperLayoutComponent,
        SwiperWrapComponent
    ],
    declarations: [
        SwiperComponent,
        SwiperTabsComponent,
        SwiperHComponent,
        SwiperMenuCenterDirective,
        SwiperMenuLeftDirective,
        SwiperMenuRightDirective,
        SwiperVComponent,
        SwiperBodyDirective,
        SwiperBottomDirective,
        SwiperTopDirective,
        SwiperScrollComponent,
        SwiperLayoutComponent,
        SwiperWrapComponent
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
export { SwiperHComponent } from './swiper-h/swiper-h';
export { SwiperVComponent } from './swiper-v/swiper-v';
export { SwiperScrollComponent } from './swiper-scroll/swiper-scroll';
export { SwiperLayoutComponent } from './swiper-layout/swiper-layout';
export { SwiperWrapComponent } from './swiper-wrap/swiper-wrap';

