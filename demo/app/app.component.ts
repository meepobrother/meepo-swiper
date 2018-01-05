import {
  Component, ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  items: any[] = [{
    image: 'https://bpic.588ku.com/element_banner/20/18/01/30e45fbaed76c6d9e1c75f81cbe4e324.jpg',
    link: ''
  }, {
    image: 'https://bpic.588ku.com/element_banner/20/18/01/1f074dddcd63a3356376372985d48bea.jpg',
    link: ''
  }];
}
