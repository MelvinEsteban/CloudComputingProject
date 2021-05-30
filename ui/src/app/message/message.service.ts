import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface resBackend {
  status: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendPost(url: string, data: any): Observable<resBackend> {
    const body = new URLSearchParams();
    if (data != null) {
      for (const elt of Object.keys(data)) {
        body.set(elt.toString(), data[elt]);
      }
    }
    return this.http.post<resBackend>(
      url,
      body.toString(),
      {
        withCredentials: true,
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  sendGet(url: string): Observable<resBackend> {
    return this.http.get<resBackend>(
      url,
      { withCredentials: true }
    );
  }

  sendPut(url: string, data: any): Observable<resBackend> {
    const body = new URLSearchParams();
    if (data != null) {
      for (const elt of Object.keys(data)) {
        body.set(elt.toString(), data[elt]);
      }
    }

    return this.http.put<resBackend>(
      url,
      body.toString(),
      {
        withCredentials: true,
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      },

    );
  }

  sendDelete(url: string): Observable<resBackend> {
    console.log("sendDelete");
    return this.http.delete<resBackend>(
      url,
      { withCredentials: true }
    );
  }
}
