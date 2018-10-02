import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  API_URL  =  'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) { 

  }

  get countries(){
    return  this.http.get(`${this.API_URL}/all`);
  }

  // get country_code(){
  //   return  this.http.get(`${this.API_URL}/`);
  // }
}
