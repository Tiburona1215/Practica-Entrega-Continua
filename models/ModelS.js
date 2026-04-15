import fs from "fs";
import path from "path";
import { projectRoot } from "../utils/path.js";

export function GetSeries(){
try{
const direccion= path.join(projectRoot, 'Data', 'Series.json');
const data=fs.readFileSync(direccion, 'utf-8');
return JSON.parse(data);
}
catch(error){
console.error("Error al leer el archivo:", error.message);
return []
}

}

export function CrearSerie(nuevaSerie){
try{
const direccion= path.join(projectRoot, 'Data', 'Series.json');
const data=fs.readFileSync(direccion, 'utf-8');
const series= JSON.parse(data);

//determinar id
let nuevoid=17;
if(series.length>0){
    const maxid= Math.max(...series.map(serie => Number(serie.id)));
    nuevoid=maxid + 1;
}

const SerieCom={
    id: nuevoid,
    ...nuevaSerie
}

series.push(SerieCom);

fs.writeFileSync(direccion, JSON.stringify(series, null, 2), 'utf-8');
return SerieCom;

}
catch(error){
console.error("Error al procesar el archivo:", error.message);
throw error;
}

}

export function editarSerie(series, index, datosForm){
    

 series[index] = {
        ...series[index],
        nombre: datosForm.nombre,
        genero: datosForm.genero,
        video_url: datosForm.enlace,
        imagen_portada: datosForm.imagen,
        detalle: datosForm.detalle
    };

    fs.writeFileSync(path.join(projectRoot, 'Data', 'Series.json'), JSON.stringify(series, null, 2), 'utf-8');

}

export function eliminarSerie(id) {
    try {
        const direccion = path.join(projectRoot, 'Data', 'series.json');
        const series = GetSeries(); // Obtiene todas las series
        
        // Filtra las series, excluyendo la que coincide con el ID
        const seriesActualizadas = series.filter(serie => serie.id != id);
        
        // Guarda el array actualizado en el JSON
        fs.writeFileSync(direccion, JSON.stringify(seriesActualizadas, null, 2), 'utf-8');
        return true; // Éxito
    } catch (error) {
        console.error("Error al eliminar la serie:", error);
        return false; // Fallo
    }
}