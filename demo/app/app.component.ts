import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation,
  ViewChild, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SwiperScrollComponent } from '../../src/app/app';
declare const Swiper: any;

let charms: any[] = [{
  title: '标题1',
  image: 'http://p.qpic.cn/qqconadmin/0/225ce8067b434eb9b2bb02f966599a4e/0',
  desc: '简介简介简介简介简介简介',
  color: 'rgb(26, 182, 252)'
}, {
  title: '标题1',
  image: 'http://p.qpic.cn/qqconadmin/0/225ce8067b434eb9b2bb02f966599a4e/0',
  desc: '简介简介简介简介简介简介',
  color: 'rgb(255, 184, 0)'
}, {
  title: '标题1',
  image: 'http://p.qpic.cn/qqconadmin/0/225ce8067b434eb9b2bb02f966599a4e/0',
  desc: '简介简介简介简介简介简介',
  color: 'rgb(255, 100, 100)'
}, {
  title: '标题1',
  image: 'http://p.qpic.cn/qqconadmin/0/225ce8067b434eb9b2bb02f966599a4e/0',
  desc: '简介简介简介简介简介简介',
  color: 'rgb(255, 90, 164)'
}];

let items = [{
  desc: '考上就“偷着乐”的五类专业, 20年后也不会“衰落”!',
  images: [
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'video'
    }
  ],
  avatar: 'https://q.qlogo.cn/g?b=qq&k=VIE5RHCJLvbeXSZXXndASw&s=100',
  nickname: '杨明明',
  goods: 0,
  discuss: 0,
  look: 0,
  title: '米波网络',
  color: 'red',
  link: ''
}, {
  desc: '考上就“偷着乐”的五类专业, 20年后也不会“衰落”!',
  images: [
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
  ],
  avatar: 'https://q.qlogo.cn/g?b=qq&k=VIE5RHCJLvbeXSZXXndASw&s=100',
  nickname: '杨明明',
  goods: 0,
  discuss: 0,
  look: 0,
  title: '米波网络',
  color: 'red',
  link: ''
}, {
  desc: '考上就“偷着乐”的五类专业, 20年后也不会“衰落”!',
  images: [
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
    {
      src: 'https://gpic.qpic.cn/gbar_pic/SMBRdKzfPmiaJsG7tzfXFeYKicBIUzEzPwXgXtibQUJiaCRmFYbroVOumWCSRtlI9kiaP/320',
      type: 'image'
    },
  ],
  avatar: 'https://q.qlogo.cn/g?b=qq&k=VIE5RHCJLvbeXSZXXndASw&s=100',
  nickname: '杨明明',
  goods: 0,
  discuss: 0,
  look: 0,
  title: '米波网络',
  color: 'red',
  link: ''
}];

import { Router } from '@angular/router';
import { Index1Component } from './index1/index1';
import { Index2Component } from './index1/index2';
import { Index3Component } from './index1/index3';
import { Index4Component } from './index1/index4';
import { Index5Component } from './index1/index5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild('swiper') swiperMain: SwiperScrollComponent;

  advs: any[] = [{
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
  }];

  footers: any[] = [{
    title: '首页1',
    active: true,
  }, {
    title: '首页2',
    active: false,
  }, {
    title: '首页3',
    active: false,
  }, {
    title: '首页4',
    active: false,
  }, {
    title: '首页5',
    active: false,
  }, {
    title: '首页1',
    active: true,
  }, {
    title: '首页2',
    active: false,
  }, {
    title: '首页3',
    active: false,
  }, {
    title: '首页4',
    active: false,
  }, {
    title: '首页5',
    active: false,
  }];

  items: any[] = [];
  charms: any[] = [];


  constructor(
    public cd: ChangeDetectorRef,
    public router: Router
  ) {
    // this.items = items;
    // setInterval(()=>{
    //   this.items = [...this.items, ...items];
    //   this.cd.markForCheck();
    // },1000);
  }

  ngAfterViewInit() {
    this.up();
    this.up();
    this.up();
    this.up();

  }

  up(e?: any) {
    console.log(this.items.length);
    if (this.items.length < 30) {
      this.items = [...this.items, ...items];
      this.swiperMain.setItems(this.items);
      this.cd.markForCheck();
    }
    if (e) {
      e.next(false);
    }
  }

  down(e: any) {
    setTimeout(() => {
      this.items = items;
      e.next(false);
      this.cd.markForCheck();
    }, 1000);
  }

}
