import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SwiperModule, SwiperConfig } from '../../src/app/app';
import { ArticleModule } from 'meepo-article';
import { MinirefreshModule } from 'meepo-minirefresh';
import { LoaderModule } from 'meepo-loader';
import { DebugerModule } from 'meepo-debuger';
import { Index1Component } from './index1/index1';
import { Index2Component } from './index1/index2';
import { Index3Component } from './index1/index3';
import { Index4Component } from './index1/index4';
import { Index5Component } from './index1/index5';

let routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'index1'
}, {
  path: 'index1',
  component: Index1Component
}, {
  path: 'index2',
  component: Index2Component
}, {
  path: 'index3',
  component: Index3Component
}, {
  path: 'index4',
  component: Index4Component
}, {
  path: 'index5',
  component: Index5Component
}];

@NgModule({
  declarations: [
    AppComponent,
    Index1Component,
    Index2Component,
    Index3Component,
    Index4Component,
    Index5Component
  ],
  imports: [
    BrowserModule,
    SwiperModule.forRoot(),
    ArticleModule,
    MinirefreshModule,
    DebugerModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

