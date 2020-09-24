import { Request, Response, Router } from 'express';

import Producto from '../models/Producto';

class ProductosRoutes {

    router: Router;

    constructor() {

        this.router = Router();
        this.routes();

    }

    // All Shows
    async getProductos( req: Request, res: Response ) {
        // Validation
        try {
            const productos = await Producto.find().populate('productos', 'sku sku description -_id');
            res.json(productos);
        } catch(err) {
            console.log(err);
            res.json({Error: 'No existe ningun dato' +err });
        }
    }

    // One Show for sku
    async getProducto( req: Request, res: Response ) {
        try{
            const producto = await Producto.findOne({ sku: req.params.sku }).populate('productos', 'sku sku description -_id');
            res.json(producto);
        } catch(err) {
            console.log(err);
            res.json({ Error: 'Este producto no existe' +err });
        }
    }

    // Created producto
    async createProducto( req: Request, res: Response ) {
        const newProducto = new Producto(req.body);
        try {
            await newProducto.save();
            res.json({ data: newProducto });
        }
        catch(err) {
            console.log(err);
            res.json({ ERROR: 'Este dato ya existe' +err });
        }
    }

    // Product Update
    async updateProducto( req: Request, res: Response ) {
        const sku = req.params.sku;
        try {
            const producto = await Producto.findOneAndUpdate({ sku }, req.body, { new: true });
            res.json(producto);
        } catch(err) {
            console.log(err);
            res.json({ ERROR: 'Error al actualizar dato' +err });
        }
    }

    // Product Deleted
    async deleteProducto( req: Request, res: Response ) {
        const { sku } = req.params;
        await Producto.findOneAndDelete({ sku });
        res.json({
            Response: 'Producto Deleted Successfully'
        });
    }

    routes() {
        this.router.get('/', this.getProductos);
        this.router.get('/:sku', this.getProducto);
        this.router.post('/', this.createProducto);
        this.router.put('/:sku', this.updateProducto);
        this.router.delete('/:sku', this.deleteProducto);
    }
}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;
