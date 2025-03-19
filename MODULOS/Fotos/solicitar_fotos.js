import { solicitud } from "../Request/solicitud_todos";

export const solitarFotos=async (URL,idAlbum) => {
    return await solicitud(`${URL}/albums?userId=${idAlbum}`);
}