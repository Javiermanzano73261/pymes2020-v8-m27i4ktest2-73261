import { Component, OnInit } from '@angular/core';
import { Servicio } from "../../models/servicio";
import { ServiciosService } from "../../services/servicios.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  Titulo = "Servicios";
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de servicios (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Servicio[] = [];
  RegistrosTotal: number;

  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    //private articulosService: MockArticulosService,
    //private articulosFamiliasService: MockArticulosFamiliasService,
    private serviciosService: ServiciosService,
    private modalDialogService: ModalDialogService
  ) {}

  ngOnInit() {
    this.FormReg = this.formBuilder.group({
      IdArticulo: [0],
      Descripcion: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(50)]
      ],
      Importe: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      CantidadHoras: [null, [Validators.required, Validators.pattern("[0-9]{1,7}")]],
      
    });

    this.GetServicios();
  }

  GetServicios() {
    this.serviciosService.get().subscribe((res: Servicio[]) => {
      this.Lista = res;
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    this.FormReg.markAsUntouched();
  }

  // Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.serviciosService
      .get(
      )
      .subscribe((res: any) => {
        this.Lista = res.Lista;
        this.RegistrosTotal = res.RegistrosTotal;
      });
  }


  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

  
    // agregar post
    if (itemCopy.IdServicio == 0 || itemCopy.IdServicio == null) {
      itemCopy.IdArticulo = 0;
      this.serviciosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
        this.Buscar();
      });
    } else {
      // modificar put
      this.serviciosService
        .put(itemCopy.IdServicio, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert("Registro modificado correctamente.");
          this.Buscar();
        });
    }
  }

 

  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }


}