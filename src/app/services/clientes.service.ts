import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Cliente } from "../models/cliente";

@Injectable({
  providedIn: "root"
})
export class ClientesService {
resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    //this.resourceUrl = "https://pavii.ddns.net/api/articulos/";
    this.resourceUrl = "http://demo3151356.mockable.io/clientes";
  }

  get() {
    let params = new HttpParams();
    
    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  
  post(obj: Cliente) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj: Cliente) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  
}