//import { GetSeries } from "../models/ModelS.js";
// import { CrearSerie } from "../models/ModelS.js";
// import { editarSerie } from "../models/ModelS.js";
// import { eliminarSerie } from "../models/ModelS.js";
import { GetGeneros } from "../models/GenerosM.js";
import { CrearGenero } from "../models/GenerosM.js";
import { editarGenero } from "../models/GenerosM.js";
import { eliminarGenero } from "../models/GenerosM.js";
import pool from "../data/db.js";

export const renderSeriesPage = async (req, res) => {
   const result = await pool.query("SELECT * FROM series");
   const series = result.rows;
   const datageneros=GetGeneros();
   const busqueda=req.query.busqueda;
   const genero= req.query.genero;

   let seriesFiltradas=series;
   if(busqueda)
    {
        const termbusqueda=busqueda.toLowerCase();
        seriesFiltradas= series.filter(serie=>
            serie.nombre && serie.nombre.toLowerCase().includes(termbusqueda) 
        );
    }
if(genero){
    const termgenero= genero.toLowerCase();
    seriesFiltradas=series.filter(serie=>
        serie.genero && serie.genero.toLowerCase().includes(termgenero)
    )
}


    res.render('index', {
        tittle: 'ListaSeries',
        series: seriesFiltradas,
        generos: datageneros.generos,
        busqueda:busqueda,
        genero:genero
    });
};

export const renderMantSeries = async (req, res) => {
  const result = await pool.query("SELECT * FROM series");
  const series = result.rows;
  
 const busqueda = req.query.busqueda;

  let seriesFiltradas=series;
   if(busqueda)
    {
        const termbusqueda=busqueda.toLowerCase();
        seriesFiltradas= series.filter(serie=>
            serie.nombre && serie.nombre.toLowerCase().includes(termbusqueda) 
        );
    }

     res.render('PDatosS', {
        tittle: 'MantSeries',
        series: seriesFiltradas,
        busqueda:busqueda
    });
}

export const renderMantgeneros=(req, res)=>{
    console.log("Ruta /PDatos alcanzada");
const datageneros=GetGeneros();
const generos=datageneros.generos;
 const busqueda=req.query.busqueda;

  let generosFiltrados=generos;
   if(busqueda)
    {
        const termbusqueda=busqueda.toLowerCase();
        generosFiltrados= generos.filter(genero=>
            genero.nombre && genero.nombre.toLowerCase().includes(termbusqueda) 
        );
    }
console.log(generosFiltrados)
     res.render('PDatos', {
        tittle: 'PersisDatos',
        generos: generosFiltrados,
        busqueda:busqueda
    });
}

export const GuardarSerie = async (req, res)=>{
    const datosForm= req.body;

const nuevaserie={
nombre: datosForm.nombre,
imagen_portada: datosForm.imagen,
genero: datosForm.genero,
video_url: datosForm.enlace,
detalle: datosForm.detalle
};

await pool.query(
  `INSERT INTO series (nombre, imagen_portada, genero, video_url, detalle)
   VALUES ($1, $2, $3, $4, $5)`,
  [
    nuevaserie.nombre,
    nuevaserie.imagen_portada,
    nuevaserie.genero,
    nuevaserie.video_url,
    nuevaserie.detalle
  ]
);
 console.log("Se llamó a GuardarSerie"); 
 console.log(datosForm);
res.redirect('/PDatosS');
};

export const renderAgregarSeries = async (req,res)=>{
const generos=GetGeneros();


     res.render('AddSrs', {
        tittle: 'addSerie',
        layout: 'FLayout',
        generos: generos.generos
       
    });

}
export const renderAgregarGeneros = async (req,res)=>{
    console.log("Entrando a /agregargen")
const generos=GetGeneros();


     res.render('AddGenr', {
        tittle: 'addGenero',
        layout: 'FLayout',
        generos: generos.generos
       
    });

}
export const GuardarGenero = async (req, res)=>{
    const datosForm= req.body;

const nuevoGenero={
nombre: datosForm.nombre,
};

CrearGenero(nuevoGenero);
 console.log("Se llamó a GuardarGenero"); 
 console.log(datosForm);
res.redirect('/PDatos');
};

export const EditarGenero= (req, res)=>{
    const id= parseInt(req.params.id);
    const Allgeneros=GetGeneros();
    const genero= Allgeneros.generos.find(g=> parseInt(g.id)===id);
    
 console.log("id:", id);
    if(!genero){
        return res.status(404).send('genero no encontrado');
    }

      res.render('AddGenr', {
        tittle: 'Editar genero',
        layout: 'FLayout',
        genero, 
        editar: true 
    });
};

export const SaveEditGenero = async (req, res)=>{
    const id= parseInt(req.params.id);
    const Allgeneros=GetGeneros();
  
    const datosForm = req.body;
    console.log(datosForm);
    editarGenero(id, datosForm);
    res.redirect('/PDatos');
};

export const EliminarGenero = async (req, res) => {
    const id = req.params.id;
    
    if (eliminarGenero(id)) { // Llama al modelo
        res.redirect('/PDatos'); // Redirige si fue exitoso
    } else {
        res.status(500).send('Error al eliminar la serie');
    }
};

export const EditarSerie = async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await pool.query(
    "SELECT * FROM series WHERE id = $1",
    [id]
  );

  const serie = result.rows[0];

    const generos=GetGeneros();
 console.log("id:", id);

    if(!serie){
        return res.status(404).send('serie no encontrada');
    }

      res.render('AddSrs', {
        tittle: 'Editar Serie',
        layout: 'FLayout',
        generos: generos.generos,
        serie, 
        editar: true 
    });
};

export const SaveEditSerie = async (req, res)=>{
    const id= parseInt(req.params.id);
    const datosForm = req.body;

    await pool.query(
      `UPDATE series 
       SET nombre=$1, imagen_portada=$2, genero=$3, video_url=$4, detalle=$5
       WHERE id=$6`,
      [
        datosForm.nombre,
        datosForm.imagen,
        datosForm.genero,
        datosForm.enlace,
        datosForm.detalle,
        id
      ]
    );

    res.redirect('/PDatosS');
};


export const renderDetalleSerie = async (req, res) => {
  const id = req.params.id;

  const result = await pool.query(
    "SELECT * FROM series WHERE id = $1",
    [id]
  );

  const serie = result.rows[0];

    res.render('Ver',{
       tittle: serie.nombre,
       serie
    });
};

export const EliminarSerie = async (req, res) => {
    try {
        const id = req.params.id;

        await pool.query(
            "DELETE FROM series WHERE id = $1",
            [id]
        );

        res.redirect('/PDatosS');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la serie');
    }
};

