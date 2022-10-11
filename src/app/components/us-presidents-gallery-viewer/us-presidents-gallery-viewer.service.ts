import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsPresidentsGalleryViewerService {
  
  constructor(private _httpClient: HttpClient) {}

  getWikipediaSummary(searchTerm: string): Promise<Object> {
    return this._httpClient.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + searchTerm).toPromise();
  }

  getWikipediaArticle(searchTerm: string): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'text/html',
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this._httpClient.get('https://en.wikipedia.org/api/rest_v1/page/mobile-html/' + searchTerm, httpOptions).toPromise();
  }

  public getJSON(filepath: string): Promise<Object> {
    return this._httpClient.get(filepath).toPromise();
  }
}