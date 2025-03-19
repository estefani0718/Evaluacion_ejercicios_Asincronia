import { solicitud } from "../Request/solicitud_todos";

export const solicitarUsers=async(URL)=>{
    return await solicitud(`${URL}/users`);
}