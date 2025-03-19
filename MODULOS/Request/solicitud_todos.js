// creamos una variable constante , dentro de ella almacenamos una funcion asincrona que tendra un solo parametro
const solicitud = async (URL) => {
    // con el try y el catch manejamos los errores dentro de nuestro codigo , para que ejecute de la mejor forma 
    try {
         // creamos otra variable que espera que se resuelva internamente la peticion 
      const peticion = await fetch(URL);
      // defino otra variable constante la cual esperara a que se convierta la peicion en un archivo legible
        const data = await peticion.json();
        // se retorna los datos que obtienen anteriomente 
        return data;
        
    } catch (error) {
        alert(error);
    }  

}
export default solicitud;
   