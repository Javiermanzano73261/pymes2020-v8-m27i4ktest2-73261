export class Servicio {
  IdServicio: number;
  Descripcion: string;
  Importe: number;
  CantidadHoras: number;
  

  /*Cada alumno va a desarrollar un proyecto con la Tabla Servicios
idservicio (autoincremental)
descripcion varchar(50)
importe numeric(12,2)
cantidadhoras int
 */
};
export const Servicios: Servicio[] = [
  {
    IdServicio: 108,
    Descripcion: "Adaptador usb wifi tl-wn722n",
    Importe: 219.0,
    CantidadHoras: 6,
  },
    {
    IdServicio: 109,
    Descripcion: "Adaptador usb c - nueva generación",
    Importe: 800.0,
    CantidadHoras: 2,
  }
  
  ]