import e, {Request, Response} from 'express';

class IndexController {
    public async list(req: Request, res: Response): Promise<void> {
        try {

            return res.render('index', {
                title: 'Home de la pagina',
                activePage: 'index',
                data: "Este proyecto ayudara atener nociones de SQL y uso de paginas web"
            });
        } catch (e) {
            return res.render('error', {title: 'ERROR', error: e});
        }
    }
}

export const indexController = new IndexController();