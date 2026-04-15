import fs from "fs";
import path from "path";
import { projectRoot } from "../utils/path.js";
const ruta = path.join(projectRoot, 'Data', 'GenerosM.json');


export function GetGeneros() {
    try {
        if (!fs.existsSync(ruta)) {
            fs.writeFileSync(ruta, JSON.stringify({ generos: [] }, null, 2));
        }
        const data = fs.readFileSync(ruta, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de géneros:", error);
        return { generos: [] };
    }
}

// Crear un nuevo género
export function CrearGenero(nuevoGenero) {
  try {
    const direccion= path.join(projectRoot, 'Data', 'GenerosM.json');
    const data = fs.readFileSync(direccion, 'utf-8');
    const objeto = JSON.parse(data);
    const generos = objeto.generos;

    // Determinar nuevo ID
    let nuevoId = 1;
    if (generos.length > 0) {
      const maxId = Math.max(...generos.map(g => Number(g.id)));
      nuevoId = maxId + 1;
    }

    const generoCompleto = {
      id: nuevoId,
      ...nuevoGenero
    };

    generos.push(generoCompleto);

    fs.writeFileSync(direccion, JSON.stringify({ generos }, null, 2), 'utf-8');
    return generoCompleto;
  } catch (error) {
    console.error("Error al guardar el nuevo género:", error.message);
    throw error;
  }
}

// Editar un género
export function editarGenero(id, datosForm) {
  try {
    const direccion= path.join(projectRoot, 'Data', 'generos.json');
    const data = fs.readFileSync(direccion, 'utf-8');
    const objeto = JSON.parse(data);
    const generos = objeto.generos;

    const index = generos.findIndex(g => g.id == id);
    if (index !== -1) {
      generos[index] = {
        ...generos[index],
        nombre: datosForm.nombre
      };

      fs.writeFileSync(direccion, JSON.stringify({ generos }, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error("Error al editar el género:", error.message);
    throw error;
  }
}

// Eliminar un género
export function eliminarGenero(id) {
  try {
    const direccion= path.join(projectRoot, 'Data', 'GenerosM.json');
    const data = fs.readFileSync(direccion, 'utf-8');
    const objeto = JSON.parse(data);
    const generos = objeto.generos;

    const generosActualizados = generos.filter(g => g.id != id);
    fs.writeFileSync(direccion, JSON.stringify({ generos: generosActualizados }, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error al eliminar el género:", error.message);
    return false;
  }
}