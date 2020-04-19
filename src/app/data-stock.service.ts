import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataStockService {

  constructor(private http: HttpClient) { }

  getStockPrice() {
    const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U8FY8BF76PIL9OMF';
    return this.http.get(url);
  }

}
