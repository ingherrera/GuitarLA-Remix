import Guitarra from "./Guitarra";

export default function ListadoGuitarras({guitarras}) {
  // console.log("-----------------ListadoGuitarras---------------")
  // console.log("guitarras=",guitarras)
  // console.log("length=",guitarras.length)
  return (
    <>
      <h2 className='heading'>Nuestra Coleccion</h2>

      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map(guitarra => {
            return(
              <Guitarra
                key={guitarra?.id}
                guitarra={guitarra.attributes}
              />
              )
            })}
        </div>
      )}
    </>
  )
}
