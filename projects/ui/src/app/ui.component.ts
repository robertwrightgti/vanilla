import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent {

  @Input() message: string;

  title = 'ui';

  constructor() {
    console.log('will not be loaded yet here', this.message)
  }

  ngOnInit() {
    console.log('keith2', this.message)
  }
}
