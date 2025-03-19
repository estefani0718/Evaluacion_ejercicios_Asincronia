import { listarTareasUsuario ,solicitarusername,solicitarAlbums,solicitarFotos,solicitarPost,solicitarPostId,solicitarComments,solicitarUsers} from "./MODULOS/index.js";


const URL = "https://jsonplaceholder.typicode.com";

while(true){
    let opcion=prompt(`1. Listar todas las tareas pendientes por cada usuario registrado en la API\n
        2. Pedir por teclado el nombre de usuario y listar los datos del usuario que concuerden\n
        con el nombre de usuario (username), anexo a los datos del usuario se debe listar\n
        en el mismo resultado todos los álbumes del usuario con sus respetivas fotografías.\n
        3. Programar una función que nos sirva para filtrar los posts por su nombre, el nombre\n
        debe ser solicitado por teclado, luego se debe agregar los comentarios.\n
        4. Consultar todos los usuarios y modificar la respuesta, el resultado de esta consulta\n
        debe ser un nuevo arreglo solo con el nombre y teléfono de cada usuario.\n
        5. Solicitar todos los usuarios en una única petición, a estos usuarios le debemos\n
        agregar todos sus posts y a cada post le debemos agregar todos sus comentarios.\n
        Luego a cada usuario le agregamos todos sus álbumes y a cada álbum le\n
        agregamos todas sus fotografías.\n 6.salir` 
    );
   if(opcion==1){
    console.log("primer ejercicio:")
    const tareas_pendientes= async (URL) => {
      try
      {
        const usuarios = await listaUsuarios(URL);
        return await  Promise.all(usuarios.map(async (usuario) => {
        const tareas = await listarTareasUsuario(usuario);
          return { ...usuario, tareas}
        }));

      } catch (error) { console.log(error)}
    }
    tareas_pendientes().then((tareas)=>{console.log(tareas);})

   }else if(opcion==2){
    const datosUserAlbums=async(URL)=>{
      let username=prompt("ingresa el nombre del usuario ");
      try {
        const  name= await solicitarusername(URL,username)
        if (name.length === 0) {
          console.log("Usuario no encontrado.");
        }
       let userId=name[0];
        const albumes= await solicitarAlbums(URL,userId);
        const dataAlbum= await Promise.all(albumes.map(async(album)=>{
            const fotos = await solicitarFotos(URL,album);
            return {...album,fotos};
          }));
        return {...username,dataAlbum};
      } catch (error) {console.log(error)}
    }
    await datosUserAlbums().then((datos)=>{console.log(datos)});
   }else if(opcion==3){
    const datosPostUser=async(URL)=>{
      let titulo =prompt ("ingrese el nombre o titulo de post :");
      try {
        const posts=await solicitarPost(URL);
        const filterPost= posts.filter((post)=>post.title==titulo)
        return await Promise.all(filterPost.map(async(post)=>{
          const comentarios= await solicitarComments(URL,post.id);
           return {...posts ,comentarios}
        }))
      } catch (error) {
        console.log(error);
      }

    }
    datosPostUser().then((post)=>{console.log(post);})

   }else if(opcion==4){

    const datosUser=async (URL) => {
      const datosUsuario=await solicitarUsers(URL);
      return datosUsuario.map((usuario)=>{
        return {"nombre":usuario.name,"telefono":usuario.phone};
      })
    }
    datosUser().then((usuarios)=>{
      console.log(usuarios)
    })

   }else if(opcion==5){

    const manejardatos = async () => {
      //creamos una variable de tipo constante , que almacenara una funcion con un parametro,
      //  la cual se esperara a que esta se resuelva como promesa 
      const usuarios =  await solicitarUsers(URL);
      // retornamos la espera de un listado de promesas , la cual se ejcutara en paralelo 
      // dentro de ella estas los array de los objetos , que se recorrera con map  y otra funcion asincrona 
      return await Promise.all(usuarios.map(async(usuario)=>{
          //creamos una variable de tipo constante , que almacenara una funcion con dos parametros,
        // la cual se esperara a que esta se resuelva como promesa 
          const posts = await solicitarPostId(URL,usuario);// ya recorrido los objetos se envia las variables a las funciones para que hagan su proceso 
          //creamos una variable de tipo constante , que almacenara una funcion con dos parametros,
        // la cual se esperara a que esta se resuelva como promesa 
          const albums = await solicitarAlbums(URL, usuario.id); 
          // creamos otra variable de tipo constante , en ella se esperara a que se cumpla un anidados de promesas en paralelo 
          const albumFotos=await  Promise.all(albums.map(async (album)=>{// la cula recorre los objetos del arrays con el id 
           // dentro de esta estara otra constante , que envia dos parametros a la funcion y esta espera a que se cumpla la promesa
              const fotos=await solicitarFotos(URL,album);
              // se retorna lo que antes previamente recorrimos , con un spread o un metodo de propagacion 
              return {...album,fotos}
          }))
          const comentPost = await Promise.all( posts.map(async(post)=>{
              const coments = await solicitarComments(URL,post);
              return {...post,coments};
          }));
          return {...usuario,comentPost,albumFotos};
      }));
    };
    // se llama a la funcion principal , para que ejecute , y pase la respuest apor un then  y se imprima todo 
    manejardatos().then((data)=>{
        console.log(data);
    });

   
  }

}