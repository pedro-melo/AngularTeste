import { Injectable, Class } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IPrato } from '../Models/prato';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PratoService {
    constructor(private http: Http) { }
    private baseUrl = "http://localhost:52416";

    GetAllPratos() {
        return this.http.get(this.baseUrl + "/api/prato").map(data => <IPrato[]>data.json());
    }

    AddPrato(prato: IPrato) {
        return this.http.post(this.baseUrl + "/api/Prato", prato).map(data => <IPrato>data.json());
    }

    UpdatePrato(id: number, prato: IPrato) {
        return this.http.put(this.baseUrl + "/api/prato/" + id, prato).map(data => <IPrato>data.json());
    }

    RemovePrato(id: number) {
        return this.http.delete(this.baseUrl + "/api/prato/" + id).map(data => <string>data.json());
    }
}