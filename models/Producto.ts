import { Schema, model } from 'mongoose';

const ProductoSchema = new Schema ({
    sku: { type: String },
    nombreProducto: { type: String },
    description: { type: String }
});

export default model('Producto', ProductoSchema);