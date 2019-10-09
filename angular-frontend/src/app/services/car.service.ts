import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Car } from '../classes/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  /**
   * For this example i placed the baseUrl inside the service
   * instead of putting it in the environment.ts
   * Also: the url might vary
   */
  baseUrl = 'http://localhost/angular-php-mix/php';
  cars: Car[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Car[]> {
    return this.http.get(this.baseUrl + '/list').pipe(
      map((res) => {
        this.cars = res['data'];
        return this.cars;
      }), catchError(this.handleError)
    );
  }

  store(car: Car): Observable<Car[]> {
    return this.http.post(this.baseUrl + '/store', { data: car}).pipe(
      map((res) => {
        this.cars.push(res['data']);
        return this.cars;
      }, catchError(this.handleError))
    );
  }

  update(car: Car): Observable<Car[]> {
    return this.http.put(this.baseUrl + '/update', { data: car }).pipe(
      map((_) => {
        const theCar = this.cars.find((item) => {
          return +item['id'] === +car['id'];
        });
        if (theCar) {
          theCar['price'] = +car['price'];
          theCar['model'] = car['model'];
        }
        return this.cars;
      }), catchError(this.handleError)
    );
  }

  delete(id: number): Observable<Car[]> {
    const params = new HttpParams().set('id', id.toString());

    return this.http.delete(this.baseUrl + '/delete', { params: params }).pipe(
      map((_) => {
        const filteredCars = this.cars.filter((car) => {
          return +car['id'] !== +id;
        });
        return this.cars = filteredCars;
      }), catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError('Something went wrong');
  }
}
