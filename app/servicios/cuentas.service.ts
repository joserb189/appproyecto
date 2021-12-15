import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cuenta } from '../modelos/cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  post(cuentaAgregar: Cuenta) {
    throw new Error('Method not implemented.');
  }
  url = 'https://apibancosj.salinacruz.tecnm.mx/public/api/cuenta';
   header = new HttpHeaders().set('Content-Type','application/json');
  constructor( private http: HttpClient) { }

  getCuentas(){
    return this.http.get<any[]>(this.url);
  }

  getCuenta(id: number): Observable<Cuenta>{
    return this.http.get<Cuenta>(`${this.url}/show/${id}`);
  }

  deleteCuenta(id: number){
    return this.http.delete<any[]>(`${this.url}/delete/${id}`,{headers: this.header});
  }

  postCuenta(cuenta:Cuenta){
    return this.http.post<any>(`${this.url}/create/`, cuenta,{headers: this.header});
  }

  putCuenta(cuenta:Cuenta): Observable<Cuenta>{
  return this.http.put<Cuenta>(`${this.url}/update/${cuenta.id}`,cuenta,{headers: this.header});
}
}
