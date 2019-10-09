import { CarService } from './services/car.service';
import { Car } from './classes/car';
import { Component, OnInit } from '@angular/core';

declare var M: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cars: Car[];

  public error = '';
  public success = '';
  public materialize: any;

  public car = new Car('', 0);

  constructor(private carService: CarService) {
    this.materialize = M;
  }

  ngOnInit() {
    this.getCars();
  }

  getCars(): void {
    this.carService.getAll().subscribe((res: Car[]) => {
      this.cars = res;
    }, (err) => this.error = err);
  }

  addCar(f) {
    this.error = '';
    this.success = '';

    this.carService.store(this.car).subscribe((res: Car[]) => {
      this.cars = res;
      this.success = 'Created successfully';
      f.reset();
    }, (err) => this.error = err);
  }

  updateCar(name, price, id) {
    this.success = '';
    this.error = '';

    this.carService.update({ model: name.value, price: price.value, id: +id }).subscribe( (res) => {
      this.cars = res;
    }, (err) => this.error = err);
  }

  deleteCar(id) {
    this.success = '';
    this.error   = '';
    
    this.carService.delete(+id).subscribe((res: Car[]) => {
      this.cars = res;
    }, (err) => this.error = err);
  }

  openToast(message: string) {
    let options;
    if (message == 'update') {
      options = {
        html: 'Updated successfully'
      }
    } else if (message == 'delete') {
      options = {
        html: 'deleted successfully'
      }
    }

    M.toast(options);
  }
}
