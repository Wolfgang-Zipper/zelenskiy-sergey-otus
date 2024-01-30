import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqBodyInterface } from 'src/app/interfaces/reqBodyInterface/req-body.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.2/';

  constructor(private http: HttpClient) {}

  sendIncident(endpoint: string, incedentMessage: string): Observable<any> {
    const reqBody: ReqBodyInterface = {
      message: incedentMessage,
      tlg: true,
      time: true,
    };

    return this.http.post(`${this.apiUrl}${endpoint}`, reqBody);
  }
}
