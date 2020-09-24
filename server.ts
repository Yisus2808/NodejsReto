import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

// Si estas en local
import mongoose from 'mongoose';

// Routes
import indexRoutes from './routes/indexRoutes';
import ProductosRoutes from './routes/ProductosRoutes';

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        // DB Config
        // Local db
        const MONGO_URI = 'mongodb://localhost/productos';
        mongoose.set('useFindAndModify' || process.env.MONGO_URL, true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }).then( db => console.log('DB is connected'));

        // Online DB
        // const MongoClient = require('mongodb').MongoClient;
        // username y password: Debera introducir su usuario de MongoClient
        // const uri = "mongodb+srv://username:password@cluster0-cp8wo.mongodb.net/test?retryWrites=true&w=majority";
        // const client = new MongoClient(uri, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // });
        // console.log('DB is conencted');
        // client.connect( () => {
        // const collection = client.db("test").collection("devices");
        //     // perform actions on the collection object
        //     client.close();
        // }, (err: any) => {
        //     console.log('Err:', err);
        // });


        // Settings
        this.app.set('port', process.env.PORT || 3000);
        // View para el html o ejs
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded( { extended: false }));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());

    }

    routes() {
        //Primary
        this.app.use(indexRoutes);

        // Si usas EJS
        // this.app.get('/', (req, res) => {
        //     res.render('index');
        // });

        //Seconds
        this.app.use('/productos', ProductosRoutes);

    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }

}

const server = new Server();
server.start();