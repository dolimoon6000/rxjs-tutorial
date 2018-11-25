import { Component } from '@angular/core';
import { interval, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/internal/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';
  mySubject$;

  ngOnInit() {
    const numbers$ = interval(1000);
    const letters$ = of('a', 'b', 'c', 'd', 'e');

    letters$.pipe(switchMap(x =>
      numbers$.pipe(take(5)).pipe(map(i => i + x))
    )).subscribe(x => console.log(x));
  }

  ngOnDestroy() {
    this.mySubject$.unsubscribe();
  }
}
