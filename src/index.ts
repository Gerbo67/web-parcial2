// Imports
import express, { Application } from 'express';
import { create } from 'express-handlebars';
import Handlebars from 'handlebars';
import logger from './utils/logger';
import pinoHttp from 'pino-http';
import './database/database';
import * as path from 'path';
import morgan from 'morgan';
import http from 'http';
import cors from 'cors';

// Require
require('dotenv').config();

// Routes
import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';

class ServerExpress {
    // Public
    public app: Application;

    // Private
    private readonly httpServer: http.Server;

    // Constructor of class
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.httpServer = new http.Server(this.app);
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        //this.app.use(pinoHttp({ logger }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Configuración de Handlebars
        const handlebars = create({
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, 'views', 'layouts'),
            extname: '.handlebars'
        });
        this.app.engine('handlebars', handlebars.engine);
        this.app.set('view engine', 'handlebars');
        this.app.set('views', [
            path.join(__dirname, 'views'),
            path.join(__dirname, 'views', 'products') // Añade esta línea
        ]);

        // Servir archivos estáticos, incluyendo Bootstrap
        this.app.use('/assets', express.static(path.join(__dirname, 'assets')));
        this.app.use('/plugins', express.static(path.join(__dirname, 'plugins')));
        this.app.use(
            '/bootstrap',
            express.static(path.join(__dirname, '..', 'node_modules', 'bootstrap', 'dist'))
        );

        // Register Helpers
        Handlebars.registerHelper('eq', function (arg1, arg2) {
            return arg1 === arg2;
        });
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/products', productRoutes);
    }

    start(): void {
        this.httpServer.listen(this.app.get('port'), () => {
            logger.info('Servidor encendido en el puerto ' + this.app.get('port'));
        });
    }
}

const server = new ServerExpress();
server.start();