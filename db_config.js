//colecciones maestras

db.createCollection('ciudades', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre", "departamento"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único de la ciudad (PK)."
                },
                codigo: {
                    bsonType: "string",  
                    description: "Código único de la ciudad.",
                    minLength: 2,
                    maxLength: 10
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre de la ciudad.",
                    minLength: 3
                },
                departamento: {
                    bsonType: "object",
                    required: ["codigo", "nombre"],
                    properties: {
                        codigo: {
                            bsonType: "string",
                            description: "Código del departamento."
                        },
                        nombre: {
                            bsonType: "string",
                            description: "Nombre del departamento."
                        }
                    },
                    additionalProperties: false // No se permiten campos adicionales en 'departamento'
                }
                },
            additionalProperties: false // No se permiten campos adicionales en el documento 'ciudades'
        }
    }
});



db.createCollection('cargos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre", "area", "activo"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del cargo (PK)."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código único del cargo.",
                    minLength: 2
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del cargo.",
                    minLength: 3
                },
                area: {
                    bsonType: "object",
                    required: ["codigo", "nombre"],
                    properties: {
                        codigo: {
                            bsonType: "string",
                            description: "Código del área a la que pertenece el cargo."
                        },
                        nombre: {
                            bsonType: "string",
                            description: "Nombre del área."
                        }
                    },
                    additionalProperties: false // No se permiten campos adicionales en 'area' incrustada
                },
                activo: {
                    bsonType: "bool", // Debe ser un booleano (true/false)
                    description: "Indica si el cargo está activo o no."
                }
            },
            additionalProperties: false // No se permiten campos adicionales en el documento 'cargos'
        }
    }
});



db.createCollection('areas', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre", "activo"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del area (PK)."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código único del area.",
                    minLength: 2
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del area.",
                    minLength: 3
                },
                activo: {
                    bsonType: "bool", // Debe ser un booleano (true/false)
                    description: "Indica si el area está activo o no."
                }
            },
            additionalProperties: false // No se permiten campos adicionales en el documento 'cargos'
        }
    }
});


db.createCollection('tipos_contrato', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre", "activo"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del tipo de contrato (PK)."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código único del tipo de contrato.",
                    minLength: 2
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del tipo de contrato.",
                    minLength: 3
                },
                activo: {
                    bsonType: "bool", // Debe ser un booleano (true/false)
                    description: "Indica si el tipo de contrato está activo o no."
                }
            },
            additionalProperties: false // No se permiten campos adicionales en el documento 'tipos_contrato'
        }
    }
});



db.createCollection('conceptos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre", "tipo", "porcentaje"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del tipo de conceptos (PK)."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código único del tipo de concepto.",
                    minLength: 2
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del concepto.",
                    minLength: 3
                },
                tipo: {
                    bsonType: "string",
                    description: "Tipo de concepto: DED (deduccion) o DEV(devengo).",
                    enum: ["DED", "DEV"]
                },
                porcentaje: {
                    bsonType: "number", 
                    description: "Indica el porcentaje 1 a 100.",
                    minimum: 1,
                    maximum:100
                }
            },
            additionalProperties: false // No se permiten campos adicionales en el documento 'tipos_contrato'
        }
    }
});


db.createCollection('tipos_novedad', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["_id", "codigo", "nombre"],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del tipos_novedad (PK)."
                },
                codigo: {
                    bsonType: "string",
                    description: "Código único del tipo de novedad.",
                    minLength: 2
                },
                nombre: {
                    bsonType: "string",
                    description: "Nombre del tipo de novedad.",
                    minLength: 3
                },
            },
            additionalProperties: false // No se permiten campos adicionales en el documento 'tipoos_novedad'
        }
    }
});



//data


db.ciudades.insertMany([
    {
        "codigo": "BOG",
        "nombre": "Bogotá",
        "departamento": {
            "codigo": "CUN",
            "nombre": "Cundinamarca"
        }
    },
    {
        "codigo": "MED",
        "nombre": "Medellín",
        "departamento": {
            "codigo": "ANT",
            "nombre": "Antioquia"
        }
    },
    {
        "codigo": "CAL",
        "nombre": "Cali",
        "departamento": {
            "codigo": "VAC",
            "nombre": "Valle del Cauca"
        }
    },
    {
        "codigo": "B/QUI",
        "nombre": "Barranquilla",
        "departamento": {
            "codigo": "ATL",
            "nombre": "Atlántico"
        }
    },
    {
        "codigo": "CTG",
        "nombre": "Cartagena",
        "departamento": {
            "codigo": "BOL",
            "nombre": "Bolívar"
        }
    }
]);


db.cargos.insertMany([
    {
        "codigo": "GGA",
        "nombre": "Gerente General",
        "area": {
            "codigo": "ADM",
            "nombre": "Administracion"
        },
        "activo": true
    },
    {
        "codigo": "ECM",
        "nombre": "Economista",
        "area": {
            "codigo": "FNZ",
            "nombre": "Finanzas"
        },
        "activo": true
    },
    {
        "codigo": "CRH",
        "nombre": "Coordinador",
        "area": {
            "codigo": "RCH",
            "nombre": "Recursos Humanos"
        },
        "activo": true
    },
    {
        "codigo": "GDV",
        "nombre": "Gerente de ventas",
        "area": {
            "codigo": "MKG",
            "nombre": "Marketing"
        },
        "activo": true
    },
    {
        "codigo": "SPT",
        "nombre": "Soporter Tecnico",
        "area": {
            "codigo": "TEC",
            "nombre": "Tecnologia"
        },
        "activo": true
    },
]);


db.tipos_contrato.insertMany([
    {
    "codigo": "INDEF",
    "nombre": "Termino Indefinido",
    "activo": true
    },
    {
    "codigo": "FIJO",
    "nombre": "Termino Fijo",
    "activo": true
    },
    {
    "codigo": "OBRALAB",
    "nombre": "Contrato por obra labor",
    "activo": true
    },
    {
    "codigo": "SERVC",
    "nombre": "Contrato de prestacion de servicios",
    "activo": true
    }
]);


db.conceptos.insertMany([
    {
        "codigo": "SAL",
        "nombre": "Salario Base",
        "tipo":"DEV",
        "porcentaje": 1
    },
    {
        "codigo": "AUXTRANS",
        "nombre": "Auxiliar de transporte",
        "tipo":"DEV",
        "porcentaje": 1
    },
    {
        "codigo": "HEXTRA",
        "nombre": "Horas Extra",
        "tipo":"DEV",
        "porcentaje": 1
    },
    {
        "codigo": "COM",
        "nombre": "Comisiones",
        "tipo":"DEV",
        "porcentaje": 5
    },
    {
        "codigo": "APORSAL",
        "nombre": "Aporte a la salud",
        "tipo":"DED",
        "porcentaje": 4
    },
    {
        "codigo": "APORPEN",
        "nombre": "Aporte a pension empleado",
        "tipo":"DED",
        "porcentaje": 6
    },
    {
        "codigo": "FSP",
        "nombre": "Fondo a solaridad pensional",
        "tipo":"DED",
        "porcentaje": 1
    },
    {
        "codigo": "PRM",
        "nombre": "Prestamo",
        "tipo":"DED",
        "porcentaje": 1
    },
]);


db.tipos_novedad.insertMany([
    {
        "codigo": "VAC",
        "nombre": "Vacaciones",
    },
    {
        "codigo": "ICM",
        "nombre": "Incapacidad Medica",
    },
    {
        "codigo": "LNR",
        "nombre": "Licencia no remunerada",
    },
    {
        "codigo": "PMP",
        "nombre": "Permiso Personal",
    },
    {
        "codigo": "RTO",
        "nombre": "Retiro",
    },
    {
        "codigo": "FAIL",
        "nombre": "Falla no justificada",
    }
]);


//colecciones Transaccionales


db.createCollection('empleados', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "cedula",
                "nombre",
                "apellido",
                "email",
                "telefono",
                "fecha_nacimiento",
                "genero",
                "direccion",
                "ciudad_id", 
                "cargo_id",  
                "area_trabajo", 
                "fecha_ingreso",
                "activo"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del empleado (PK)."
                },
                cedula: {
                    bsonType: "string",
                    description: "Número de cédula del empleado (único).",
                    minLength:2,
                    maxLength:10
                },
                nombre: {
                    bsonType: "string",
                    description: "Primer nombre del empleado.",
                    minLength: 2
                },
                apellido: {
                    bsonType: "string",
                    description: "Apellido del empleado.",
                    minLength: 2
                },
                email: {
                    bsonType: "string",
                    description: "Correo electrónico del empleado (único).",
                },
                telefono: {
                    bsonType: "number",
                    description: "Número de teléfono del empleado."
                },
                fecha_nacimiento: {
                    bsonType: "date",
                    description: "Fecha de nacimiento del empleado."
                },
                genero: {
                    bsonType: "string",
                    description: "Género del empleado (ej. 'M', 'F', 'Otro').",
                    enum: ["M", "F", "O"]
                },
                direccion: {
                    bsonType: "string",
                    description: "Dirección de residencia del empleado.",
                    minLength: 5
                },
                ciudad_id: {
                    bsonType: "objectId",
                    description: "Referenciar el _id de la (ciudad) de residencia del empleado."
                },
                cargo_id: {
                    bsonType: "objectId", 
                    description: "Referenciar el _id del (cargo) actual del empleado."
                },
                area_trabajo: {
                    bsonType: "object",
                    description: "Copia de los detalles del área de trabajo del empleado.",
                    required: ["codigo", "nombre"],
                    properties: {
                        codigo: { bsonType: "string" },
                        nombre: { bsonType: "string" }
                    },
                    additionalProperties: false 
                },
                fecha_ingreso: {
                    bsonType: "date", 
                    description: "Fecha de ingreso del empleado a la empresa."
                },
                activo: {
                    bsonType: "bool",
                    description: "Indica si el empleado está activo actualmente."
                }
            },
            additionalProperties: false 
        }
    }
});


//data para empleados

db.empleados.insertMany([
        {
            "cedula": "1001001001",
            "nombre": "Juan",
            "apellido": "Pérez",
            "email": "juan.perez@Acme.com",
            "telefono": 3001112233,
            "fecha_nacimiento": ISODate("1985-05-15T00:00:00Z"),
            "genero": "M",
            "direccion": "Carrera 10 # 20-30",
            "ciudad_id":  ObjectId('6865a7dfebc4a0da019cce8f'),
            "cargo_id": ObjectId('6865ab98ebc4a0da019cce94'),
            "area_trabajo": {"codigo": "ADM", "nombre": "Administracion"}, 
            "fecha_ingreso": ISODate("2020-01-01T00:00:00Z"),
            "activo": true
        },
        {
            "cedula": "5896154732",
            "nombre": "Samuel",
            "apellido": "Torres",
            "email": "samuel.gaytorres@Acme.com",
            "telefono": 3114569789,
            "fecha_nacimiento": ISODate("1989-01-20T00:00:00Z"),
            "genero": "M",
            "direccion": "Carrera 7 # 25-70",
            "ciudad_id": ObjectId('6865a7dfebc4a0da019cce90'), 
            "cargo_id": ObjectId('6865ab98ebc4a0da019cce95'),
            "area_trabajo": {"codigo": "FNZ", "nombre": "Finanzas"},
            "fecha_ingreso": ISODate("2021-04-15T00:00:00Z"),
            "activo": true
        },
        {
            "cedula": "2563487563",
            "nombre": "Brayan",
            "apellido": "Gordillo",
            "email": "brayan.gordillo@Acme.com",
            "telefono": 3006487856,
            "fecha_nacimiento": ISODate("2007-04-26T00:00:00Z"),
            "genero": "M",
            "direccion": "Carrera 86 # 64-58",
            "ciudad_id": ObjectId('6865a7dfebc4a0da019cce91'),
            "cargo_id": ObjectId('6865ab98ebc4a0da019cce96'),
            "area_trabajo": {"codigo": "RCH", "nombre": "Recursos Humanos"},
            "fecha_ingreso":  ISODate("2024-08-15T00:00:00Z"),
            "activo": true
        },
        {
            "cedula": "1001001001",
            "nombre": "Andrey",
            "apellido": "Martinez",
            "email": "andrey.martinez@Acme.com",
            "telefono": 3256348795,
            "fecha_nacimiento": ISODate("1990-10-25T00:00:00Z"),
            "genero": "M",
            "direccion": "Carrera 15 # 28-70",
            "ciudad_id":  ObjectId('6865a7dfebc4a0da019cce92'),
            "cargo_id": ObjectId('6865ab98ebc4a0da019cce97'),
            "area_trabajo": {"codigo": "MKG", "nombre": "Marketing"}, 
            "fecha_ingreso": ISODate("2020-01-01T00:00:00Z"),
            "activo": true
        }
]);

db.createCollection("novedades", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
            "_id",
            "empleado_id",
            "tipo_novedad_id",
            "fecha_inicio",
            "fecha_fin",
            "dias_afectados"
        ],
        properties: {
            _id: {
            bsonType: "objectId"
            },
            empleado_id: {
                bsonType: "objectId",
                description: "ID del empleado al que aplica la novedad"
            },
            tipo_novedad_id: {
                bsonType: "objectId",
                description: "ID del tipo de novedad"
            },
            fecha_inicio: {
                bsonType: "date",
                description: "Fecha de inicio de la novedad"
            },
            fecha_fin: {
                bsonType: "date",
                description: "Fecha de fin de la novedad"
            },
            dias_afectados: {
                bsonType: "int",
                minimum: 0,
                description: "Número de días que la novedad afecta el salario (incluyendo inicio y fin)"
            },
            descripcion: {
                bsonType: "string",
                description: "Descripción detallada de la novedad (opcional)"
            }   
        },
        additionalProperties: false
    }
}
});




db.createCollection("periodos_nomina", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
            "_id",
            "fecha_inicio",
            "fecha_fin",
            "nombre_periodo",
            "estado"
            ],
            properties: {
            _id: {
                bsonType: "objectId"
            },
            fecha_inicio: {
                bsonType: "date",
                description: "Fecha de inicio del periodo de nómina"
            },
            fecha_fin: {
                bsonType: "date",
                description: "Fecha de fin del periodo de nómina"
            },
            nombre_periodo: {
                bsonType: "string",
                description: "Nombre descriptivo del periodo (Enero 2025)"
            },
            estado: {
                bsonType: "string",
                enum: ["Abierto", "Cerrado"],
                description: "Estado del periodo (Abierto para cálculos, Cerrado una vez generada la nómina)"
                }
            },
            additionalProperties: false
        }
    }
});




db.createCollection("usuarios", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
            "_id",
            "username",
            "password", 
            "email",
            "rol"
            ],
            properties: {
            _id: {
                bsonType: "objectId"
            },
            username: {
                bsonType: "string",
                minLength: 3,
                description: "Nombre de usuario para iniciar sesión."
            },
            password: {
                bsonType: "string",
                minLength: 6,
                description: "Contraseña del usuario (en producción sería un hash)."
            },
            email: {
                bsonType: "string",
                description: "Correo electrónico del usuario."
            },
            empleado_id: {
                bsonType: "objectId",
                description: "ID del empleado asociado a este usuario (si aplica)."
            },
            rol: {
                bsonType: "string",
                enum: ["Administrador", "Gestor de Nómina", "Empleado"],
                description: "Rol del usuario en el sistema."
            },
            activo: {
                bsonType: "bool",
                description: "Estado de actividad del usuario."
            },
            fecha_creacion: {
                bsonType: "date",
                description: "Fecha de creación del usuario."
                }
            },
            additionalProperties: false
        }
    }
});



//creacdion de roles
db.createRole(
    {
    role: "administrador",
    db:"proyecto",
    privileges: [
        { resource: { db: "proyecto", collection: "" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "" }, actions: ["collStats", "dbStats", "listCollections", "createCollection", "dropCollection", "changeStream"] }
    ],
    roles: []
    }
)



db.createRole(
    {
    role: "gestorNomina",
    privileges: [
    
        { resource: { db: "proyecto", collection: "empleados" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "contratos" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "novedades" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "nominas" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "periodos_nomina" }, actions: ["find", "insert", "update", "remove"] },
        { resource: { db: "proyecto", collection: "ciudades" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "cargos" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "areas" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "tipos_contrato" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "conceptos" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "tipos_novedad" }, actions: ["find"] }
    ],
    roles: []
    }
)


db.createRole(
    {
    role: "empleadoBasico",
    privileges: [
        { resource: { db: "proyecto", collection: "empleados" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "contratos" }, actions: ["find"] },
        { resource: { db: "proyecto", collection: "nominas" }, actions: ["find"] }
    ],
    roles: []
    }
)
