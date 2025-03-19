import { solicitud } from "../Request/solicitud_todos";

export const solicitarPostId= async(URL,usuario)=>{
    return  await    solicitud(`${URL}/posts?userId=${usuario.id}`) 
}