import e, {Request, Response} from 'express';
import ProductRepository from "../repository/productRepository";

class ProductController {
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const data = await ProductRepository.getProducts();

            return res.render('listProduct', {title: 'Lista de productos', activePage: 'listProduct', data: data});
        } catch (e) {
            return res.render('error', {title: 'ERROR', error: e});
        }
    }
}

export const productController = new ProductController();