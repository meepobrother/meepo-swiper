import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from './swiper/swiper';
import { LoaderModule } from 'meepo-loader';

@NgModule({
    imports: [
        CommonModule,
        LoaderModule.forRoot({
            root: './assets/meepo.libs/'
        })
    ],
    exports: [
        SwiperComponent
    ],
    declarations: [
        SwiperComponent
    ],
    providers: [
    ],
})
export class SwiperModule { }
