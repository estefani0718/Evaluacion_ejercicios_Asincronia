//importamos las funciones que va resivir este archivo , con su respectiva ruta de la carpeta 
// el cual esta cada uno de estos archivos
import {getUsuarios,getPost,getCommets, getAlbumes, getFotos} from "./modulos/archivo_Barril.js";
// creamos una cosntante la cual contendra la url de la pagina principal  para su reutilizacion en el codigo 
const URL = "https://jsonplaceholder.typicode.com";
//definimos una funcion expresada , la cual tendra una funcion asincronica que envolver el codigo en una promesa 
// esta no esta recibiendo ningun parametro
const manejardatos = async () => {
    //creamos una variable de tipo constante , que almacenara una funcion con un parametro,
    //  la cual se esperara a que esta se resuelva como promesa 
    const usuarios =  await getUsuarios(URL);
    // retornamos la espera de un listado de promesas , la cual se ejcutara en paralelo 
    // dentro de ella estas los array de los objetos , que se recorrera con map  y otra funcion asincrona 
    return await Promise.all(usuarios.map(async(usuario)=>{
        //creamos una variable de tipo constante , que almacenara una funcion con dos parametros,
      // la cual se esperara a que esta se resuelva como promesa 
        const posts = await getPost(URL,usuario);// ya recorrido los objetos se envia las variables a las funciones para que hagan su proceso 
        //creamos una variable de tipo constante , que almacenara una funcion con dos parametros,
      // la cual se esperara a que esta se resuelva como promesa 
        const albums = await getAlbumes(URL, usuario.id); 
        // creamos otra variable de tipo constante , en ella se esperara a que se cumpla un anidados de promesas en paralelo 
        const albumFotos=await  Promise.all(albums.map(async (album)=>{// la cula recorre los objetos del arrays con el id 
         // dentro de esta estara otra constante , que envia dos parametros a la funcion y esta espera a que se cumpla la promesa
            const fotos=await getFotos(URL,album);
            // se retorna lo que antes previamente recorrimos , con un spread o un metodo de propagacion 
            return {...album,fotos}
        }))
      // creamos otra variable constante, donde se espera recorrer un encadenamiento de promesas y se recorren con la funcion  map 
      const comentPost = await Promise.all(posts.map(async (post) => {
          // dentro de  esto se alamcena otra variable  constante donde se espera resolver la promesa que esta denro de la funcion que sea exportado en otro archivo 
            const coments = await getCommets(URL,post);
            return {...post,coments};
        }));
        return {...usuario,comentPost,albumFotos};
    }));
};
// se llama a la funcion principal , para que ejecute , y pase la respuesta por un then  y se imprima todo 
manejardatos().then((data)=>{
    console.log(data);
});
