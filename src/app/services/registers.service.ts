import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistersService {

  constructor(private http: HttpClient) { }
  private url = 'https://tesis-node-mysql.herokuapp.com/registers';
  private url2 ='https://tesis-node-mysql.herokuapp.com/api';

  getRegisters(){
    return this.http.get(this.url);
  }

  getRegistersVol(){
    return this.http.get( `${this.url2}/voltage` );
  }
  
  getRegistersCur(){
    return this.http.get( `${this.url2}/current` );
  }
  getRegistersPowerA(){
    return this.http.get( `${this.url2}/power/a` );
  }
  getRegistersPowerB(){
    return this.http.get( `${this.url2}/power/b` );
  }
  getRegistersPowerC(){
    return this.http.get( `${this.url2}/power/c` );
  }

}
