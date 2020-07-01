import { Component, OnInit } from '@angular/core';
import { HelloService } from '../../services/hello.service';

@Component({
  selector: 'ui-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private helloService: HelloService
  ) {
      this.helloService.getData().subscribe((data) => {
          if(data) {
              console.log('HelloComponent', data)
          }
      })
  }

  ngOnInit(): void {
  }

}
