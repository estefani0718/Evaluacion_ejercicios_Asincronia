


const listaUsuarios = async () => {
  const usuarios = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await usuarios.json();
  return data;
}
const listarTareasUsuario = async (usuario,estado) => {
  const tareas = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${usuario.id}&completed=${estado}`);
  const data = await tareas.json();
  return data;
}

const manejaador = async () => {
  const usuarios = await listaUsuarios();
  const usuariosTareas = await  Promise.all(usuarios.map(async (usuario) => {
    const tareas = await listarTareasUsuario(usuario,true);
    return { ...usuario, tareas }
  }));
  console.log(usuariosTareas);
}
manejaador();






