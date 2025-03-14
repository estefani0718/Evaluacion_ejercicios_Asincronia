// aqui importamos una funcion que sera unica en su tipo la cual se reutilizara en este codigo 
import solicitud from "./solicitud.js";
// exportamos funcion expresada , que sera una promesa con la funcion asincrona dentro de ella 
// se recibe dos parametros dentro de la funcion 
export const getCommets=async(URL,post)=>{
    // se retorna la funcion la cual tiene la especialidad de areggar url y proesar la peticion 
    // la cual se espera que la promesa se cumpla en todo caso 
    return  await solicitud(`${URL}/comments?postId=${post.id}`)
}