import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante';

@Component({
    selector: 'Restaurante',
    templateUrl: './Restaurante.component.html'
})

export class RestauranteComponent implements OnInit {
    restaurantes: IRestaurante[] = [];
    restaurante: IRestaurante = <IRestaurante>{}
    form: FormGroup;
    formSearch: FormGroup;
    isNew: boolean = false;
    listView: boolean = false;
    label: string = "";

    ngOnInit() {
        this.GetAllRestaurante();
    }

    constructor(private restauranteService: RestauranteService, private fb: FormBuilder) {
        this.form = fb.group({
            "name": [],
        });
        this.formSearch = fb.group({
            "search": [],
        });
    }

    private GetAllRestaurante() {
        this.restauranteService.GetAllRestaurante().subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    buscar() {
        this.restauranteService.SearchRestaurante(this.formSearch.controls["search"].value).subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    cadastrar() {
        this.label = "Adicionar restaurante";
        this.listView = true;
        this.isNew = false;
        this.form.reset();
    }

    onSubmit() {
        this.restaurante.name = this.form.controls["name"].value;
        if (this.isNew) {
            this.restaurante.id = 0;
            this.restauranteService.UpdateRestaurante(this.restaurante.id, this.restaurante).subscribe(
                data => {
                    this.GetAllRestaurante();
                    this.form.reset();
                    this.listView = false;
                }
            );
        } else {
            this.restauranteService.AddRestaurante(this.restaurante).subscribe(
                data => {
                    this.restaurantes.push(data);
                    this.form.reset();
                    this.listView = false;
                }
            );
        }
    }

    cancelar() {
        this.listView = false;
        this.isNew = false;
        this.form.reset();
    }

    editar(restaurante: IRestaurante) {
        this.label = "Editar restaurante";
        this.listView = true;
        this.isNew = true;
        this.restaurante = restaurante;
        this.form.setValue({
            "name": restaurante.name
        });
    }

    remover(restauranteId: number) {
        this.restauranteService.RemoveRestaurante(restauranteId).subscribe(
            data => {
                this.GetAllRestaurante();
            }
        );
    }
}