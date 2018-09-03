import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PratoService } from '../../Services/prato.service';
import { IPrato } from '../../Models/prato';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RestauranteService } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Models/restaurante';

@Component({
    selector: 'Prato',
    templateUrl: './prato.component.html'
})
export class PratoComponent implements OnInit {
    pratos: IPrato[] = [];
    restaurantes: IRestaurante[] = [];
    prato: IPrato = <IPrato>{}
    form: FormGroup;
    addEditForm: boolean = false;
    isNew: boolean = false;
    label: string = "";

    constructor(private pratoService: PratoService, private restauranteService: RestauranteService, private fb: FormBuilder) {
        this.form = fb.group({
            "name": ["", Validators.required],
            "price": ["", Validators.required],
            "restauranteId": ["", Validators.required]

        });
    }

    private GetAllPratos() {
        this.pratoService.GetAllPratos().subscribe(
            data => this.pratos = data,
            error => alert(error)
        );
    }

    private GetAllRestaurantes() {
        this.restauranteService.GetAllRestaurante().subscribe(
            data => this.restaurantes = data,
            error => alert(error)
        );
    }

    ngOnInit() {
        this.GetAllPratos();
    }

    cadastrar() {
        this.label = "Adicionar prato";
        this.addEditForm = true;
        this.isNew = true;
        this.GetAllRestaurantes()
    }

    cancelar() {
        this.addEditForm = false;
        this.isNew = false;
        this.GetAllPratos();
        this.form.reset();
    }

    onSubmit() {
        this.prato.name = this.form.controls["name"].value;
        this.prato.price = this.form.controls["price"].value;
        this.prato.restauranteId = this.form.controls["restauranteId"].value;
        if (!this.isNew) {
            this.pratoService.UpdatePrato(this.prato.id, this.prato).subscribe(
                data => {
                    this.GetAllPratos();
                    this.form.reset();
                    this.addEditForm = false;
                }
            );
        } else {
            this.pratoService.AddPrato(this.prato).subscribe(
                data => {
                    this.GetAllPratos();
                    this.form.reset();
                    this.addEditForm = false;
                }
            );
        }
    }

    editar(prato: IPrato) {
        this.label = "Editar prato";
        this.addEditForm = true;
        this.isNew = false;
        this.prato = prato;
        this.GetAllRestaurantes()
        this.form.setValue({
            "name": prato.name,
            "restauranteId": prato.restauranteId,
            "price": prato.price
        });
    }

    remover(id: number) {
        this.pratoService.RemovePrato(id).subscribe(
            data => {
                this.GetAllPratos();
            }
        );
    }
}