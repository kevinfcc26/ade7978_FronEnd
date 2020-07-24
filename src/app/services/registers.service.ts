import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private http: HttpClient) { }
  private url = 'https://tesis-node-mysql.herokuapp.com/registers';

  getRegisters(){
    return this.http.get(this.url);
  }


}
