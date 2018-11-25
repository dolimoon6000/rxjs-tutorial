import { Component } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchSubject$ = new Subject<string>();

  ngOnInit() {
    this.searchSubject$.pipe(debounceTime(200)).subscribe(x => console.log('debounced: ', x));
  }

  inputChanged($event) {
    console.log('input changed', $event);
    this.searchSubject$.next($event);
  }

  ngOnDestroy() {
    this.searchSubject$.unsubscribe();
  }
}
