import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  apiUrl;
  constructor(private http: HttpClient) { }

  setUrl(url: string){
    this.apiUrl = url;
  }

  apiCall(){
    return this.http.get(this.apiUrl);
  }



}
