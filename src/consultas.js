
// Ganado con cada modelo de Huawei.
db.VentasMobiles.aggregate([
        { $match:  { MarcaProducto: "Huawei" }},
    { $group: { _id: "$Producto", total: { $sum: "$PrecioUnitario" } } },
  ])


  // Ganado por cada Marca.
  db.VentasMobiles.aggregate([
    { $group: { _id: "$MarcaProducto", total: { $sum: "$PrecioUnitario" } } },
  ])


  //Ganado por cada Vendedor menos los telefonos de Apple.
  db.VentasMobiles.aggregate([
    { $match:  { MarcaProducto: { $not: /Apple/ } }},
{ $group: { _id: "$Vendedor", total: { $sum: "$PrecioUnitario" } } },
])


//Media del precio de los moviles vendidos por cada vendedor, sin contar los de Huawei.
db.VentasMobiles.aggregate([
    { $match:  { MarcaProducto: { $not: /Huawei/ } }},
{ $group: { _id: "$Vendedor", total: { $avg: "$PrecioUnitario" } } },
])

//Suma de las compras de cada cliente, ordenado de Mayor a menor.
db.VentasMobiles.aggregate([
{ $group: { _id: "$Comprador", total: { $sum: "$PrecioUnitario" } } },
{ $sort: { total: -1}},
])



//Suma de las ventas de cada vendedor, ordenado de Mayor a menor.
db.VentasMobiles.aggregate([
    { $group: { _id: "$Vendedor", total: { $sum: "$PrecioUnitario" } } },
    { $sort: { total: -1}},
    ])


    //Suma de las ventas de cada producto, ordenado de mayor a menor.
    db.VentasMobiles.aggregate([
        { $group: { _id: "$Producto", total: { $sum: "$PrecioUnitario" } } },
        { $sort: { total: -1}},
        ])   


        //Dinero ganado por cada vendedor por la venta de los móviles que no sean Samsung
        db.VentasMobiles.aggregate([
        { $match:  { MarcaProducto: { $not: /Samsung/ }}},
        { "$addFields": {
          "Multi": { "$multiply": [  "$PrecioUnitario", 0.2 ] }}},
      { $group: {_id: "$Vendedor" , total: {$sum : "$Multi"}}}
      ])


      //Dinero que da directamente el comprador a Apple al comprar sus moviles
      db.VentasMobiles.aggregate([
        { $match:  { MarcaProducto:  /Apple/ }},
        { "$addFields": {
          "Div": { "$divide": [  "$PrecioFabrica", 2 ] }}},
      { $group: {_id: "$Comprador" , total: {$sum : "$Div"}}}
      ])


      // Precio máximo de un móvil que no sea Samsung, agrupado por Marcas.
      db.VentasMobiles.aggregate([
          {$match: { MarcaProducto:{$not : /Samsung/} }},
          { $group :{_id: "$MarcaProducto", maxPrecio: { $max: "$PrecioUnitario" } }},
        ])


        //Precio del movil más barato vendido por cada Vendedor.
        db.VentasMobiles.aggregate([
          { $group :{_id: "$Vendedor",minPrecio: { $min: "$PrecioUnitario" }}},
        ])


        //Dinero ganado cada dia.
        db.VentasMobiles.aggregate([
        { $group: { _id: { $dayOfYear: "$Venta"}, DineroGanado: { $sum: "$PrecioUnitario" } } } ])


        //Dinero ganado cada mes sin contar productos Samsung.
        db.VentasMobiles.aggregate([
          {$match: { MarcaProducto:{$not : /Samsung/} }},
          { $group: { _id: { $month: "$Venta"}, DineroGanado: { $sum: "$PrecioUnitario" } } } ])

        

          