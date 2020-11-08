import { Injectable } from "@angular/core";
import { of } from "rxjs";
import {  Servicios , Servicio } from "../models/servicio";

@Injectable({
  providedIn: 'root'
})
export class MockServiciosService {
  constructor() {}
   get() {
    return of(Servicio);
  }

  // no usamos get con parametros porque javascript no soporta sobrecarga de metodos!
  getById(Id: number) {
    var items: Servicio = Servicios.filter(x => x.IdServicio === Id)[0];
    return of(items);
  }

  post(obj: Servicio) {
    obj.IdServicio = new Date().getTime();
    Servicios.push(obj);
    return of(obj);
  }

  put(Id: number, obj: Servicio) {
    var indice;
    var items = Servicios.filter(function(item, index) {
      if (item.IdServicio === Id) {
        indice = index;
      }
    });
    Servicios[indice] = obj;
    return of(obj);
  }

  delete(Id: number) {
    var items = Servicios.filter(x => x.IdArticulo === Id);
    items[0].Activo = !items[0].Activo;
    return of(items[0]);
  }
}
