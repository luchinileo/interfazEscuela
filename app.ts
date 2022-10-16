interface Alumno {
    nombre: string,
    apellido: string,
    materias: Materia[]
}

interface Materia {
    nombre: string
    nota?: number
    notaFinal?: number
    aprobado?: boolean
}

interface Maestro {
    nombre: string,
    apellido: string,
    materia: string,
    listadoAlumnos: Alumno[]
}

class Escuela {
    public listadoMaestros : Maestro[]
    public listadoAlumnos: Alumno[]


    constructor(listadoMaestros: Maestro[], listadoAlumnos: Alumno[]){
        this.listadoAlumnos = listadoAlumnos;
        this.listadoMaestros = listadoMaestros;
    }

    matricular(nuevoAlumno: Alumno) {
        this.listadoAlumnos.push(nuevoAlumno)
        return this.listadoAlumnos
    }

    contratar(nuevoProfesor: Profesor) {
        this.listadoMaestros.push(nuevoProfesor)
        return this.listadoMaestros
    }

    expulsarAlumno(alumnoExpulsado: Alumno){
        return this.listadoAlumnos.filter(alumno => (alumno.nombre !== alumnoExpulsado.nombre))
    }

    despedirMaestro(maestroDespedido: Maestro){
        return this.listadoMaestros.filter(maestro => (maestro.nombre !== maestroDespedido.nombre))
    }

}

class Profesor {

    nombre : string;
    apellido : string;
    materia : string;
    listadoAlumnos: Alumno[]

    constructor(nombre: string, apellido: string, materia: string, listadoAlumnos: Alumno[]) {
        this.nombre =nombre;
        this.apellido= apellido;
        this.materia = materia;
        this.listadoAlumnos = listadoAlumnos

    }


    getListadoAlumnos() : Alumno[]{
        return this.listadoAlumnos
    }

    correccionExamenAlumno(alumnoACorregir: string, nota: number, materiaProfesor: string) {
        return this.listadoAlumnos.filter(alumno => {
            if(alumno.nombre === alumnoACorregir){
                alumno.materias.filter(materia => {
                    if(materia.nombre === materiaProfesor) {
                        materia.nota = nota
                        if(nota >=7){
                            materia.aprobado = true
                        }else {
                            materia.aprobado = false
                        }
                        return materia
                }})
            }
        })
    }
}

class Alumno {
    nombre: string
    apellido: string
    materias: Materia[]
    

    constructor(nombre: string, apellido: string, materias : Materia[] = []) {
        this.nombre=nombre,
        this.apellido = apellido,
        this.materias = materias
    }



    getMateria(materiaAVerificar: string){
        return this.materias.filter(materia => (materia.nombre === materiaAVerificar))
    }

}

//creacion de materias x alumno
const materiasAlumno1 = [{nombre: 'Matematicas'}]
const materiasAlumno2 = [{nombre: 'Geografía'}]

//Instanciamos Alumnos
const alumno1 = new Alumno('Marcelo', 'Sad', materiasAlumno1)
const alumno2 = new Alumno('Fabian', 'Dalas', materiasAlumno2)
const alumno3 = new Alumno('Alexander', 'Mull', materiasAlumno2)

//creamos alumnos
const alumnos = [alumno1, alumno2]

//Instanciamos profesor
const JuanCarlos = new Profesor('Juan Carlos', 'MarCel', 'Matematicas', alumnos )

// Profesor - Listado de sus Alumnos
console.log(JuanCarlos.listadoAlumnos)

//Profesor - Correccion de examenes por alumno
JuanCarlos.correccionExamenAlumno(alumno1.nombre, 7, JuanCarlos.materia)


//Alumno saber su nota
console.log(alumno1.getMateria(JuanCarlos.materia))


//Escuela Registro de los alumnos y profesores
const escuelaN1 = new Escuela([JuanCarlos], alumnos)

//Escuela matricula alumno
escuelaN1.matricular(alumno3)
//Escuela contracta profesor
escuelaN1.contratar(new Profesor('María Fernanda', 'Llanos', 'Geografía', alumnos))
//Escuela despide profesor
escuelaN1.despedirMaestro(JuanCarlos)
//Escuela expulsa alumno
escuelaN1.expulsarAlumno(alumno2)