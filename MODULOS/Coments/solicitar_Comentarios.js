import { solicitud } from "../Request/solicitud_todos";

export const solicitarComments=async(URL,post)=>{
    // se retorna la funcion la cual tiene la especialidad de agregar url y procesar la peticion 
    // la cual se espera que la promesa se cumpla en todo caso 
    return  await solicitud(`${URL}/comments?postId=${post.id}`)
}