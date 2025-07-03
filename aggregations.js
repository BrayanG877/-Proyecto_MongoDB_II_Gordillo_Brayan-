//agregaccion para ver el valor de todo lo pagado

db.nominas.aggregate([
    {
        $match: {
            periodo_nomina: ISODate("2025-01-01T00:00:00Z")
        }
    },
    {
        $unwind: "$detalles" 
    },
    {
        $group: {
            _id: {
                conceptoId: "$detalles.concepto_id",
                nombreConcepto: "$detalles.nombre_concepto"
            },
            totalPagado: { $sum: "$detalles.valor" } 
        }
    },
    {
        $project: {
            _id: 0,
            concepto: "$_id.nombreConcepto",
            total: "$totalPagado"
        }
    },
    {
        $sort: {
            concepto: 1
        }
    }
]);

//agregacion total de Empleados por Cargo y por area
db.empleados.aggregate([
    {
        $lookup: {
            from: "cargos",        
            localField: "cargo_id", 
            foreignField: "_id",    
            as: "info_cargo"        
        }
    },
    {
        $unwind: "$info_cargo" 
    },

    {
        $group: {
            _id: {
                cargo: "$info_cargo.nombre", 
                area: "$area_trabajo.nombre" 
            },
            totalEmpleados: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0, 
            cargo: "$_id.cargo",
            area: "$_id.area",
            cantidad: "$totalEmpleados"
        }
    },
    {
        $sort: {
            cargo: 1, 
            area: 1 
        }
    }
]);

// agregaccion para listar a los empleados con faltas
db.novedades.aggregate([
    {
        $match: {
            fecha_inicio: { $gte: ISODate("2025-01-01T00:00:00Z") },
            fecha_fin: { $lte: ISODate("2025-01-31T23:59:59Z") },
            "tipo_novedad_id": ObjectId('6865e089ebc4a0da019ccee1') 
        }
    },
    {
        $lookup: {
            from: "empleados",          
            localField: "empleado_id",  
            foreignField: "_id",        
            as: "info_empleado"         
        }
    },
    {
        $unwind: "$info_empleado" 
    },
    {
        $project: {
            _id: 0, 
            nombreEmpleado: "$info_empleado.nombre",
            apellidoEmpleado: "$info_empleado.apellido",
            tipoDocumento: "$info_empleado.tipo_documento",
            numeroDocumento: "$info_empleado.numero_documento",
            tipoNovedad: "$descripcion", 
            fechaInicioFalta: "$fecha_inicio",
            fechaFinFalta: "$fecha_fin",
            diasAfectados: "$dias_afectados"
        }
    },
    {
        $sort: {
            fechaInicioFalta: 1, 
            apellidoEmpleado: 1 
        }
    }
]);
