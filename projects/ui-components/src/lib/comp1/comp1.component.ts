import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
