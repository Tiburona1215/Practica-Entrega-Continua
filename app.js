import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import { projectRoot } from './utils/path.js';
import homeroute from "./routes/home.js";
import { fileURLToPath } from 'url';
const app = express();

import pool from "./data/db.js";

await pool.query(`
  CREATE TABLE IF NOT EXISTS series (
    id SERIAL PRIMARY KEY,
    nombre TEXT,
    imagen_portada TEXT,
    genero TEXT,
    video_url TEXT,
    detalle TEXT
  );
`);

const check = await pool.query("SELECT COUNT(*) FROM series");

if (parseInt(check.rows[0].count) === 0) {
  await pool.query(`
    INSERT INTO series (nombre, imagen_portada, genero, video_url, detalle)
    VALUES 
      ('Breaking Bad', 'img1.jpg', 'Drama', 'link1', 'Descripcion 1'),
      ('Dark', 'img2.jpg', 'Sci-Fi', 'link2', 'Descripcion 2'),
      ('Friends', 'img3.jpg', 'Comedy', 'link3', 'Descripcion 3')
  `);
}

await pool.query(`
  CREATE TABLE IF NOT EXISTS generos (
    id SERIAL PRIMARY KEY,
    nombre TEXT
  );
`);

const checkGen = await pool.query("SELECT COUNT(*) FROM generos");

if (parseInt(checkGen.rows[0].count) === 0) {
  await pool.query(`
    INSERT INTO generos (nombre)
    VALUES 
      ('Drama'),
      ('Comedia'),
      ('Accion'),
      ('Sci-Fi')
  `);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//render engine
app.engine('hbs', engine({
    layoutsDir:"views/layouts",
    defaultLayout: "MLayout",
    extname: "hbs",
    helpers:{
        videoId: function (url){
            const match=url.match(/v=([^&]+)/);
            return match ? match[1]: '';
        },
        eq: function (a, b) {
             return a === b;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(express.static(path.join(projectRoot, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use((req, res, next) => {
  console.log("Middleware global: llegó una petición a:", req.url);
  next();
});


app.use(homeroute);
//404
app.use((req,res)=>{
    res.status(404).render("404", {pageTitle: "Page Not found"});

});

// Iniciar servidor
app.listen(3121, () => {
    console.log('Servidor escuchando en http://localhost:3121');
});
