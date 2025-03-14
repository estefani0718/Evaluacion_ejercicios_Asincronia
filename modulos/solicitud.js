
// creamos una variable constante , dentro de ella almacenamos una funcion asincrona que tendra un solo parametro
const solicitud = async (URL) => {
// creamos otra variable que espera que se resuelva internamente la peticion 
  const peticion = await fetch(URL);
// definios otra variable constante la cual esperara a que se convierta la peicion en un archivo legible
  const data = await peticion.json();
  // se retorna los datos que obtienen anteriomente 
  return data;
}
// se exporta la funcion solicitud para su manejo unico dentro de otros archivos 
export default solicitud 