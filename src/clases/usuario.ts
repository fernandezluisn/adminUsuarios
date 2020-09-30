export class Usuario{

    idU:number;
    id;
    correo:string;
    perfil:string;
    sexo:string;
    nombre:string;
    apellido:string;
    dni:number;

    constructor(idU, correo, perfil, sexo, nombre, apellido, dni){
        this.idU=idU;
        this.correo=correo;
        this.perfil=perfil;
        this.sexo=sexo;
        this.apellido=apellido;
        this.nombre=nombre;
        this.dni=dni;
    }
}