import { Injectable, Class } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IRestaurante } from '../Models/restaurante';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class RestauranteService {
    constructor(private http: Http) { }
    private baseUrl = "http://localhost:52416";

    GetAllRestaurante() {
        return this.http.get(this.baseUrl + "/api/Restaurante").map(data => <IRestaurante[]>data.json());
    }

    SearchRestaurante(querString: string) {
        if (querString != null && querString != "")
            return this.http.get(this.baseUrl + "/api/restaurante/name/" + querString).map(data => <IRestaurante[]>data.json());
        else
            return this.http.get(this.baseUrl + "/api/Restaurante").map(data => <IRestaurante[]>data.json());
    }

    GetRestauranteById(id: number) {
        return this.http.get(this.baseUrl + "/api/restaurantes/" + id).map(data => <IRestaurante>data.json());
    }

    AddRestaurante(restaurante: IRestaurante) {
        return this.http.post(this.baseUrl + "/api/Restaurante", restaurante).map(data => <IRestaurante>data.json());
    }

    UpdateRestaurante(id: number, restaurante: IRestaurante) {
        return this.http.put(this.baseUrl + "/api/restaurante/" + id, restaurante).map(data => <IRestaurante>data.json());
    }

    RemoveRestaurante(id: number) {
        return this.http.delete(this.baseUrl + "/api/restaurante/" + id).map(data => <string>data.json());
    }
}