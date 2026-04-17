import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsPresidentsGalleryViewerService {
  
  constructor(private _httpClient: HttpClient) {}

  public getWikipediaArticle(): Observable<any[]> {
    return this._httpClient.get<any[]>('https://www.wikitable2json.com/api/List_of_presidents_of_the_United_States?cleanRef=true');
  }

  public getMediaList(): Observable<any> {
    return this._httpClient.get('https://en.wikipedia.org/api/rest_v1/page/media-list/List_of_presidents_of_the_United_States');
  }
}