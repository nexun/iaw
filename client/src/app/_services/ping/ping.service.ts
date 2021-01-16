import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { interval } from 'rxjs';

@Injectable()
export class PingService {
  pingStream: Subject<number> = new Subject<number>();
  ping: number = 0;
  url: string = "http://localhost:3000/ping";

  constructor(protected _http: HttpClient) {
    interval(2000)
      .subscribe((data) => {
        let timeStart: number = performance.now();
        this._http.get(this.url)
          .subscribe((data) => {
            let timeEnd: number = performance.now();
            let ping: number = timeEnd - timeStart;
            this.ping = Math.round(ping);
            this.pingStream.next(ping);
          });
      });
  }
}