Este proyecto necesita los modulos para poder ser ejecutado

## Instalarlos con:

### `npm install`

## Puedes usar..

Para ejecutarlo deberas usar:

### `npm run start`

Este proyecto solo es el backend de un reto en NodeJS.
Para hacer testing usar la siguiente instruccion:


        Hacer las pruebas en PostMan o InsomniaRest.


        GetProductos: http://localhost:3000/productos


        GetProducto: http://localhost:3000/producto/sku


        PutProducto: http://localhost:3000/productos/sku


            enviar tu json... Ejmplo:

            {
                "sku": "14MESD545SD",
                "nombreProducto": "Primer producto - update",
                "description": "Primer descripcion - update"
            }


        PostProducto: http://localhost:3000/productos


        Enviar tu json... Ejemplo:

        {
            "sku": "14MESD545SD",
            "nombreProducto": "Primer producto",
            "description": "Primer descripcion"
        }


        DelProducto: http://localhost:3000/producto/sku


_Este proyecto es OpenSource, pero deberas dar creditos._