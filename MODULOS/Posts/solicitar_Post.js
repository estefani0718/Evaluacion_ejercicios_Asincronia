import { solicitud } from "../Request/solicitud_todos";

export const solicitarPost=async(URL)=>{
    return await solicitud(`${URL}/posts`);
}