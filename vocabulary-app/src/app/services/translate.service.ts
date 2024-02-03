import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  // ...
  standalone: true,
  providers: [TranslateService, HttpClient], // HttpClient добавлен в providers
})
export class TranslateService {
  private apiUrl: string =
    'https://translate.api.cloud.yandex.net/translate/v2/translate';

  constructor(private http: HttpClient) {}

  translateText(
    text: string,
    fromLang: string,
    toLang: string
  ): Observable<any> {
    const body = {
      texts: text,
      sourceLanguageCode: fromLang,
      targetLanguageCode: toLang,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Api-Key ................',
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
