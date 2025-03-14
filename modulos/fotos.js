// aqui importamos una funcion que sera unica en su tipo la cual se reutilizara en este codigo 
import solicitud from "./solicitud.js";
// exportamos funcion expresada , que sera una promesa con la funcion asincrona dentro de ella 
// se recibe dos parametros dentro de la funcion 
export const getFotos=async(URL,album)=>{
    // creamos una constante , en ella se resuelve la promesa , donde se espera a q esta se cumpla,
    //  enviadole la ruta para que se valide 
    const fotos=await solicitud(`${URL}/photos?albumId=${album.id}`);
    // se retorna la variable quien contiende o almacena los datos  
    return fotos;
}