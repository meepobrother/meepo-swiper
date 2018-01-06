import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SwiperModule } from '../../src/app/app';
import { ArticleModule } from 'meepo-article';
import { MinirefreshModule } from 'meepo-minirefresh';
import { LoaderModule } from 'meepo-loader';
import { DebugerModule } from 'meepo-debuger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    ArticleModule,
    MinirefreshModule,
    DebugerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

