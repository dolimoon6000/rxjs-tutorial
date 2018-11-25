import { Component } from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchSubject$ = new Subject<string>();
  results$: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.searchSubject$
      .pipe(debounceTime(200))
      .pipe(distinctUntilChanged())
      .pipe(tap(x => console.log('do', x)))
      .pipe(switchMap(searchString => this.queryAPI(searchString)));
  }

  queryAPI(searchString) {
    console.log('queryAPI', searchString);
    return this.http.get(`http://www.reddit.com/r/aww/search.json?q=${searchString}`)
      .pipe(map(result => result['data']['children']));

  }

  inputChanged($event) {
    console.log('input changed', $event);
    this.searchSubject$.next($event);
  }

  ngOnDestroy() {
    this.searchSubject$.unsubscribe();
  }
}
