import express from 'express';
import {engine} from 'express-handlebars';
import path from 'path';
import { projectRoot } from './utils/path.js';
import homeroute from "./routes/home.js";
import { fileURLToPath } from 'url';
const app = express();

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
