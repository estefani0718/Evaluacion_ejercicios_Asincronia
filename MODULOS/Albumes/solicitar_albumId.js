import { solicitud } from "../Request/solicitud_todos";

export const solicitudAlbums=async(URL,userId)=>{
    const album=await solicitud(`${URL}/albums?userId=${userId}`)
    return album;

}