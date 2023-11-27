import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'royal';

  items = [
    { title: 'Item 1', content: 'Content for Item 1' },
    { title: 'Item 2', content: 'Content for Item 2' },
    { title: 'Item 3', content: 'Content for Item 3' },
    { title: 'Item 1', content: 'Content for Item 1' },
    { title: 'Item 2', content: 'Content for Item 2' },
    { title: 'Item 3', content: 'Content for Item 3' },
    { title: 'Item 1', content: 'Content for Item 1' },
    { title: 'Item 2', content: 'Content for Item 2' },
    { title: 'Item 3', content: 'Content for Item 3' },
    // Add more items as needed
  ];
}
