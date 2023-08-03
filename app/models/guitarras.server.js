
export async function getGuitarras() {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
  return await respuesta.json()
}

export async function getGuitarra(url) {
  const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
  const pascu = await respuesta.json()
  console.log("pascu..", pascu.data)
  // return await respuesta.json()
  // return  respuesta.json()
  return pascu
}
