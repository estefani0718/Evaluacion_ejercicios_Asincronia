import { solicitud } from "../Request/solicitud_todos";


export const listarTareasUsuario = async (URL) => {
    const tareas = await solicitud(`${URL}/todos`);
    const data = await tareas.json();
    return data;
}
  
  