import { solicitud } from "../Request/solicitud_todos";
// importamos la funcion que reutiizaremos el codigo que esta en este modulo o carpeta
//exportamos la funcion 
// esta funcion almacena la respuesta de todos los usuarios 
export const listarTareasUsuario = async (URL) => {
    const tareas = await solicitud(`${URL}/todos`);
    const data = await tareas.json();// se convierte en algo mas entendible en este caso un json , donde estaran los datos que solictamos anteriormente 
    return data;// se retorna los datos esperados 
}
  
  