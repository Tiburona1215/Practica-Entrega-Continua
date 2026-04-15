import { GetSeries } from "../models/ModelS.js";
import { CrearSerie } from "../models/ModelS.js";
import { editarSerie } from "../models/ModelS.js";
import { eliminarSerie } from "../models/ModelS.js";
import { GetGeneros } from "../models/GenerosM.js";
import { CrearGenero } from "../models/GenerosM.js";
import { editarGenero } from "../models/GenerosM.js";
import { eliminarGenero } from "../models/GenerosM.js";

export const renderSeriesPage= (req, res)=>{
   const series= GetSeries();
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

export const renderMantSeries=(req,res)=>{
     console.log("Ruta /PDatos alcanzada");
const series=GetSeries();
 const busqueda=req.query.busqueda;

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

export const GuardarSerie=(req, res)=>{
    const datosForm= req.body;

const nuevaserie={
nombre: datosForm.nombre,
imagen_portada: datosForm.imagen,
genero: datosForm.genero,
video_url: datosForm.enlace,
detalle: datosForm.detalle
};

CrearSerie(nuevaserie);
 console.log("Se llamó a GuardarSerie"); 
 console.log(datosForm);
res.redirect('/PDatosS');
};

export const renderAgregarSeries=(req,res)=>{
const generos=GetGeneros();


     res.render('AddSrs', {
        tittle: 'addSerie',
        layout: 'FLayout',
        generos: generos.generos
       
    });

}
export const renderAgregarGeneros=(req,res)=>{
    console.log("Entrando a /agregargen")
const generos=GetGeneros();


     res.render('AddGenr', {
        tittle: 'addGenero',
        layout: 'FLayout',
        generos: generos.generos
       
    });

}
export const GuardarGenero=(req, res)=>{
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

export const SaveEditGenero= (req, res)=>{
    const id= parseInt(req.params.id);
    const Allgeneros=GetGeneros();
  
    const datosForm = req.body;
    console.log(datosForm);
    editarGenero(id, datosForm);
    res.redirect('/PDatos');
};

export const EliminarGenero = (req, res) => {
    const id = req.params.id;
    
    if (eliminarGenero(id)) { // Llama al modelo
        res.redirect('/PDatos'); // Redirige si fue exitoso
    } else {
        res.status(500).send('Error al eliminar la serie');
    }
};

export const EditarSerie= (req, res)=>{
    const id= parseInt(req.params.id);
    const AllSeries=GetSeries();
    const serie= AllSeries.find(s=> parseInt(s.id)===id);
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

export const SaveEditSerie= (req, res)=>{
    const id= parseInt(req.params.id);
    const AllSeries=GetSeries();
    const index= AllSeries.findIndex(s=> parseInt(s.id)===id);
  

   if (index === -1) {
        return res.status(404).send('Serie no encontrada');
    }

    const datosForm = req.body;
console.log(datosForm);
    editarSerie(AllSeries, index, datosForm);
    res.redirect('/PDatosS');
};

export const renderDetalleSerie=(req,res)=>{
    const id=req.params.id
    const series= GetSeries();
    const serie= series.find(s=> s.id===id);

    res.render('Ver',{
       tittle: serie.nombre,
       serie
    });
};

export const EliminarSerie = (req, res) => {
    const id = req.params.id;
    
    if (eliminarSerie(id)) { // Llama al modelo
        res.redirect('/PDatosS'); // Redirige si fue exitoso
    } else {
        res.status(500).send('Error al eliminar la serie');
    }
};

