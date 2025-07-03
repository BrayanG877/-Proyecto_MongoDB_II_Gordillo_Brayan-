//novedades

db.novedades.insertMany([
    {
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f34'), //Brayan Gordillo
        "tipo_novedad_id": ObjectId('6866b033ff9d850bfeb15f2d'), //falta Injustificada
        "fecha_inicio": ISODate("2025-01-20T00:00:00Z"),
        "fecha_fin": ISODate("2025-01-22T00:00:00Z"),
        "dias_afectados": 3, 
        "descripcion": "Falta injustificada por 3 días."
    },
    {
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f32'), //Juan Pérez
        "tipo_novedad_id": ObjectId('6866b033ff9d850bfeb15f28'), //vacaciones
        "fecha_inicio": ISODate("2025-02-01T00:00:00Z"),
        "fecha_fin": ISODate("2025-02-15T00:00:00Z"),
        "dias_afectados": 15,
        "descripcion": "Vacaciones anuales."
    }
]);


db.periodos_nomina.insertMany([
    {
        "_id": ObjectId('6866b202ff9d850bfeb15f34'),
        "fecha_inicio": ISODate("2025-01-01T00:00:00Z"),
        "fecha_fin": ISODate("2025-01-31T23:59:59Z"),
        "nombre_periodo": "Enero 2025",
        "estado": "Cerrado"
    },
    {
        "_id": ObjectId('6866b202ff9d850bfeb15f32'),
        "fecha_inicio": ISODate("2025-02-01T00:00:00Z"),
        "fecha_fin": ISODate("2025-02-28T23:59:59Z"),
        "nombre_periodo": "Febrero 2025",
        "estado": "Cerrado"
    }
]);

db.empleados.find({}, {nombre: 1, apellido: 1}).pretty()
db.tipos_contrato.find({}, {nombre: 1}).pretty()
db.nominas.insertMany([
    //nomina de Juan perez (Salario: 2.800.000, no auxilio transporte, sin faltas en enero)
    {
        "codigo_nomina": "NOM-202501-JP",
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f32'),
        "contrato_id": ObjectId('6866b022ff9d850bfeb15f1d'),
        "periodo_nomina": ISODate("2025-01-01T00:00:00Z"),
        "salario_base": 2800000.00,
        "total_devengos": 2800000.00,
        "total_deducciones": (2800000 * 0.04 * 2), //Salud y Pensión
        "neto_pagar": 2800000.00 - (2800000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 2800000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 2800000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 2800000 * 0.04 }
        ]
    },

    //nomina de Samuel Gay Torres (Salario: 1.800.000, si auxilio transporte, sin faltas en enero)
    {
        "codigo_nomina": "NOM-202501-SG",
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f33'),
        "contrato_id": ObjectId('6866b022ff9d850bfeb15f1e'), 
        "periodo_nomina": ISODate("2025-01-01T00:00:00Z"),
        "salario_base": 1800000.00,
        "total_devengos": 1800000.00 + 162000.00, // Salario + Auxilio
        "total_deducciones": (1800000 * 0.04 * 2),
        "neto_pagar": (1800000.00 + 162000.00) - (1800000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 1800000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedd'), "codigo_concepto": "AUX_TRANS", "nombre_concepto": "Auxilio de Transporte", "tipo": "DEV", "valor": 162000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 1800000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 1800000 * 0.04 }
        ]
    },

    //nomina de Brayan Gordillo (Salario: 1.500.000, si auxilio transporte, con 3 días de faltas en enero)
    {
        "codigo_nomina": "NOM-202501-BG",
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f34'),
        "contrato_id": ObjectId('6866b022ff9d850bfeb15f1f'),
        "periodo_nomina": ISODate("2025-01-01T00:00:00Z"),
        "salario_base": 1500000.00,
        "dias_faltas": 3, 
        "valor_dia_salario": 1500000.00 / 30, 
        "deduccion_faltas": (1500000.00 / 30) * 3,
        "total_devengos": 1500000.00 + 162000.00, // Salario + Auxilio
        "total_deducciones": (1500000 * 0.04 * 2) + ((1500000 / 30) * 3), // Salud + Pensión + Faltas
        "neto_pagar": (1500000.00 + 162000.00) - ((1500000 * 0.04 * 2) + ((1500000 / 30) * 3)),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 1500000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedd'), "codigo_concepto": "AUX_TRANS", "nombre_concepto": "Auxilio de Transporte", "tipo": "DEV", "valor": 162000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 1500000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 1500000 * 0.04 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccee0'), "codigo_concepto": "NOVEDAD_FALTA", "nombre_concepto": "Descuento por Falta", "tipo": "DED", "valor": (1500000 / 30) * 3, "novedad_id": ObjectId('6865e7e4ebc4a0da019ccedb'),} 
        ]
    },

    //nomina de Andrey Martinez (Salario: 3.500.000, no auxilio transporte, sin faltas en enero)
    {
        "codigo_nomina": "NOM-202501-AM",
        "empleado_id": ObjectId('6866b202ff9d850bfeb15f35'),
        "contrato_id": ObjectId('6866b022ff9d850bfeb15f1c'),
        "periodo_nomina": ISODate("2025-01-01T00:00:00Z"),
        "salario_base": 3500000.00,
        "total_devengos": 3500000.00,
        "total_deducciones": (3500000 * 0.04 * 2),
        "neto_pagar": 3500000.00 - (3500000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 3500000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 3500000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 3500000 * 0.04 }
        ]
    },

//nomina de febrero2025

    //nomina de juan perez (Salario: 2.800.000, no auxilio transporte)
    {
        "codigo_nomina": "NOM-202502-JP",
        "empleado_id": ObjectId('6865d616ebc4a0da019cced5'), 
        "contrato_id": ObjectId('6865adc6ebc4a0da019cce9e'),
        "periodo_nomina": ISODate("2025-02-01T00:00:00Z"), 
        "salario_base": 2800000.00,
        "total_devengos": 2800000.00,
        "total_deducciones": (2800000 * 0.04 * 2),
        "neto_pagar": 2800000.00 - (2800000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 2800000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 2800000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 2800000 * 0.04 }
        ]
    },

    //nomina de Samuel Gay Torres (Salario: 1.800.000, si auxilio transporte)
    {
        "codigo_nomina": "NOM-202502-SG",
        "empleado_id": ObjectId('6865d616ebc4a0da019cced6'), 
        "contrato_id": ObjectId('6865adc6ebc4a0da019ccea0'),
        "periodo_nomina": ISODate("2025-02-01T00:00:00Z"),
        "salario_base": 1800000.00,
        "total_devengos": 1800000.00 + 162000.00,
        "total_deducciones": (1800000 * 0.04 * 2),
        "neto_pagar": (1800000.00 + 162000.00) - (1800000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 1800000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedd'), "codigo_concepto": "AUX_TRANS", "nombre_concepto": "Auxilio de Transporte", "tipo": "DEV", "valor": 162000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 1800000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 1800000 * 0.04 }
        ]
    },

    //nomina de Brayan Gordillo (Salario: 1.500.000, si auxilio transporte, sin faltas en Febrero, estuvo juicioso el mk ese)
    {
        "codigo_nomina": "NOM-202502-BG",
        "empleado_id": ObjectId('6865d616ebc4a0da019cced7'), 
        "contrato_id": ObjectId('6865adc6ebc4a0da019cce9f'),
        "periodo_nomina": ISODate("2025-02-01T00:00:00Z"),
        "salario_base": 1500000.00,
        "total_devengos": 1500000.00 + 162000.00,
        "total_deducciones": (1500000 * 0.04 * 2),
        "neto_pagar": (1500000.00 + 162000.00) - (1500000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 1500000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedd'), "codigo_concepto": "AUX_TRANS", "nombre_concepto": "Auxilio de Transporte", "tipo": "DEV", "valor": 162000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 1500000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 1500000 * 0.04 }
        ]
    },

    //nomina de Andrey Martinez (Salario: 3.500.000, no auxilio transporte)
    {
        "codigo_nomina": "NOM-202502-AM",
        "empleado_id": ObjectId('6865d848ebc4a0da019cced8'), 
        "contrato_id": ObjectId('6865adc6ebc4a0da019ccea1'),
        "periodo_nomina": ISODate("2025-02-01T00:00:00Z"),
        "salario_base": 3500000.00,
        "total_devengos": 3500000.00,
        "total_deducciones": (3500000 * 0.04 * 2),
        "neto_pagar": 3500000.00 - (3500000 * 0.04 * 2),
        "detalles": [
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccedc'), "codigo_concepto": "BAS", "nombre_concepto": "Salario Básico", "tipo": "DEV", "valor": 3500000.00 },
            { "concepto_id": ObjectId('6865e042ebc4a0da019ccede'), "codigo_concepto": "SALUD_EMP", "nombre_concepto": "Aporte Salud Empleado", "tipo": "DED", "valor": 3500000 * 0.04 },
            { "concepto_id": ObjectId('6865b2eeebc4a0da019cceb7'), "codigo_concepto": "PENS_EMP", "nombre_concepto": "Aporte Pension Empleado", "tipo": "DED", "valor": 3500000 * 0.04 }
        ]
    }
]);
