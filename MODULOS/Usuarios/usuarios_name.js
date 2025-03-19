import { solicitud } from "../Request/solicitud_todos";

export const solicitarUsername=async (username,URL)=>{
     return await solicitud(`${URL}/users?username=${username}`);
    
}