## qrcode for angular
```html
<swiper [items]="items">
    <ng-template #ref let-item>
        <img [src]="item.image">
    </ng-template>
</swiper>
```

```ts
export class AppComponent {
  items: any[] = [{
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
  }];
}
```