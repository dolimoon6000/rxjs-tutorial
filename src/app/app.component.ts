import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  mySubject$;

  ngOnInit() {
    fromEvent(document, 'click').subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
}
