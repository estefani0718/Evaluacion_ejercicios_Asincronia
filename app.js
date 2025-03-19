import { Usuarios, Albumes, Fotos, Posts, Coments } from "./MODULOS/index.js";

const URL = "https://jsonplaceholder.typicode.com";


while (true) {
  try {
    let opcion = prompt(`1. Listar todas las tareas pendientes por cada usuario registrado en la API
      2. Pedir por teclado el nombre de usuario y listar los datos del usuario que concuerden
      con el nombre de usuario (username), anexo a los datos del usuario se debe listar
      en el mismo resultado todos los álbumes del usuario con sus respetivas fotografías.
      3. Programar una función que nos sirva para filtrar los posts por su nombre, el nombre
      debe ser solicitado por teclado, luego se debe agregar los comentarios.
      4. Consultar todos los usuarios y modificar la respuesta, el resultado de esta consulta
      debe ser un nuevo arreglo solo con el nombre y teléfono de cada usuario.
      5. Solicitar todos los usuarios en una única petición, a estos usuarios le debemos
      agregar todos sus posts y a cada post le debemos agregar todos sus comentarios.
      Luego a cada usuario le agregamos todos sus álbumes y a cada álbum le
      agregamos todas sus fotografías.
      6. Salir`
    );

    if (opcion == 1) {
      console.log("Ejercicio 1:");
      const tareas_pendientes = async () => {
        try {
          const usuarios = await Usuarios.solicitarUsers(URL);
          return await Promise.all(usuarios.map(async (usuario) => {
            const tareas = await Usuarios.listarTareasUsuario(usuario);
            return { ...usuario, tareas };
          }));
        } catch (error) {
          console.log(error);
        }
      };
      tareas_pendientes().then((tareas) => console.log(tareas));
    }

    else if (opcion == 2) {
      console.log("ejercicio 2")
      const datosUserAlbums = async () => {
        let username = prompt("Ingresa el nombre del usuario: ");
        try {
          const name = await Usuarios.solicitarusername(URL, username);
          if (name.length === 0) {
            console.log("Usuario no encontrado.");
            return;
          }
          let userId = name[0];
          const albumes = await Albumes.solicitarAlbums(URL, userId);
          const dataAlbum = await Promise.all(albumes.map(async (album) => {
            const fotos = await Fotos.solicitarFotos(URL, album);
            return { ...album, fotos };
          }));
          return { ...username, dataAlbum };
        } catch (error) {
          console.log(error);
        }
      };
      datosUserAlbums().then((datos) => console.log(datos));
    }

    else if (opcion == 3) {
      console.log("ejercicio 3")
      const datosPostUser = async () => {
        let titulo = prompt("Ingrese el título del post: ");
        try {
          const posts = await Posts.solicitarPost(URL);
          const filterPost = posts.filter((post) => post.title == titulo);
          return await Promise.all(filterPost.map(async (post) => {
            const comentarios = await Coments.solicitarComments(URL, post.id);
            return { ...post, comentarios };
          }));
        } catch (error) {
          console.log(error);
        }
      };
      datosPostUser().then((post) => console.log(post));
    }

    else if (opcion == 4) {
      console.log("ejercicio 4")
      const datosUser = async () => {
        const datosUsuario = await Usuarios.solicitarUsers(URL);
        return datosUsuario.map((usuario) => ({
          nombre: usuario.name,
          telefono: usuario.phone
        }));
      };
      datosUser().then((usuarios) => console.log(usuarios));
    }

    else if (opcion == 5) {
      console.log("ejercicio 5")
      const manejarDatos = async () => {
        const usuarios = await Usuarios.solicitarUsers(URL);
        return await Promise.all(usuarios.map(async (usuario) => {
          const posts = await Posts.solicitarPostId(URL, usuario);
          const albums = await Albumes.solicitarAlbums(URL, usuario.id);
          const albumFotos = await Promise.all(albums.map(async (album) => {
            const fotos = await Fotos.solicitarFotos(URL, album);
            return { ...album, fotos };
          }));
          const comentPost = await Promise.all(posts.map(async (post) => {
            const coments = await Coments.solicitarComments(URL, post);
            return { ...post, coments };
          }));
          return { ...usuario, comentPost, albumFotos };
        }));
      };
      manejarDatos().then((data) => console.log(data));
    }

    else if (opcion == 6) {
      console.log("Saliendo...");
      break;
    }
    else {
      console.log("Opción inválida. Intenta de nuevo.");
    }
  } catch (error) {
    console.log(error);
  }
}
