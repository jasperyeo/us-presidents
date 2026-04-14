import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsPresidentsGalleryViewerService {
  
  constructor(private _httpClient: HttpClient) {}

  getWikipediaArticle(): Promise<any[]> {
    return this._httpClient.get<any[]>('https://www.wikitable2json.com/api/list_of_us_presidents?cleanRef=true').toPromise();
  }

  public getJSON(filepath: string): Promise<Object> {
    return this._httpClient.get(filepath).toPromise();
  }
}