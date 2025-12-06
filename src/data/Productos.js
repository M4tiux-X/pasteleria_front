
export const productos = [
    // Tortas cuadradas
    {
        id: "TC001",
        titulo: "Torta Cuadrada de Chocolate",
        imagen: "/public/img/Tortas_Cuadradas/Torta_cuadrada_chocolate.jpg",
        categoria: {
            nombre: "Tortas Cuadradas",
            id: "Tortas cuadradas"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 45000,
        descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
    },
    {
        id: "TC002",
        titulo: "Torta Cuadrada de Frutas",
        imagen: "/public/img/Tortas_Cuadradas/Torta_cuadrada_frutas.jpg",
        categoria: {
            nombre: "Tortas Cuadradas",
            id: "Tortas Cuadradas"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 50000,
        descripcion: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
    },
    // Tortas circulares
    {
        id: "TT001",
        titulo: "Torta Circular de Vainilla",
        imagen: "/public/img/Tortas_circulares/Torta_circular_vainilla.jpg",
        categoria: {
            nombre: "Tortas Circulares",
            id: "Tortas Circulares"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 40000,
        descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."

    },
    {
        id: "TT002",
        titulo: "Torta Circular de Manjar",
        imagen: "/public/img/Tortas_circulares/Torta_circular_manjar.png",
        categoria: {
            nombre: "Tortas Circulares",
            id: "Tortas Circulares"
        },
        menu: {
            we: "torta",
            nom: "Torta"
        },
        precio: 42000,
        descripcion: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos."
    },
    // Postres individuales
    {
        id: "PI001",
        titulo: "Mousse de Chocolate",
        imagen: "/public/img/Postres_individuales/Mousse_de_chocolate_individual.jpg",
        categoria: {
            nombre: "Postres Individuales",
            id: "Postres Individuales"
        },
        menu: {
            we: "individuales",
            nom: "Individuales"
        },
        precio: 5000,
        descripcion:"Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate"
    },
    {
        id: "PI002",
        titulo: "Tiramisú Clásico",
        imagen: "/public/img/Postres_individuales/Tiramisu_de_chocolate_individual.jpg",
        categoria: {
            nombre: "Postres Individuales",
            id: "Postres Individuales"
        },
        menu: {
            we: "individuales",
            nom: "Individuales"
        },
        precio: 5000,
        descripcion:"Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida."
    },
    // Productos sin azúcar
    {
        id: "PSA001",
        titulo: "Torta Sin Azúcar de Naranja",
        imagen: "/public/img/Sin_azucar/Torta_naranza_sin_azucar.jpg",
        categoria: {
            nombre: "Productos Sin Azúcar",
            id: "Productos Sin Azúcar"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 48000,
        descripcion:"Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables."
    },
    {
        id: "PSA002",
        titulo: "Cheesecake Sin Azúcar",
        imagen: "/public/img/Sin_azucar/Cheesecake_sin_azucar.jpg",
        categoria: {
            nombre: "Productos Sin Azúcar",
            id: "Productos Sin Azúcar"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 47000,
        descripcion:"Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa"
    },
    // Pastelería tradicional
    {
        id: "PT001",
        titulo: "Empanada de Manzana",
        imagen: "/public/img/Pasteleria_tradicional/Empanada_de_manzana.jpg",
        categoria: {
            nombre: "Pastelería Tradicional",
            id: "Pastelería Tradicional"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 3000,
        descripcion:"Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda."
    },
    {
        id: "PT002",
        titulo: "Tarta de Santiago",
        imagen: "/public/img/Pasteleria_tradicional/Tarta_de_Santiago.jpg",
        categoria: {
            nombre: "Pastelería Tradicional",
            id: "Pastelería Tradicional"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 6000,
        descripcion:"Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos"
    },
    // Productos sin gluten
    {
        id: "PG001",
        titulo: "Brownie Sin Gluten",
        imagen: "/public/img/Sin_gluten/Brownie_sin_gluten.jpg",
        categoria: {
            nombre: "Productos Sin Gluten",
            id: "Productos Sin Gluten"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 4000,
        descripcion:"Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor"
    },
    {
        id: "PG002",
        titulo: "Pan Sin Gluten",
        imagen: "/public/img/Sin_gluten/Pan_sin_gluten.jpg",
        categoria: {
            nombre: "Productos Sin Gluten",
            id: "Productos Sin Gluten"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 3500,
        descripcion:"Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida."
    },
    // Productos veganos
    {
        id: "PV001",
        titulo: "Torta Vegana de Chocolate",
        imagen: "/public/img/Tortas_veganas/Torta_chocolate_vegano1.jpg",
        categoria: {
            nombre: "Productos Veganos",
            id: "Productos Veganos"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 50000,
        descripcion:"Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos."
    },
    {
        id: "PV002",
        titulo: "Galletas Veganas de Avena",
        imagen: "/public/img/Tortas_veganas/galletas_avena_veganas.jpg",
        categoria: {
            nombre: "Productos Veganos",
            id: "Productos Veganos"
        },
        menu: {
            we: "alternativos",
            nom: "Alternativos"
        },
        precio: 4500,
        descripcion:"Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano."
    },
    // Tortas especiales
    {
        id: "TE001",
        titulo: "Torta Especial de Cumpleaños",
        imagen: "/public/img/Tortas_especiales/Torta_cumpleaños.jpg",
        categoria: {
            nombre: "Tortas Especiales",
            id: "Tortas Especiales"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 55000,
        descripcion:"Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos"
    },
    {
        id: "TE002",
        titulo: "Torta Especial de Boda",
        imagen: "/public/img/Tortas_especiales/Torta_boda.jpg",
        categoria: {
            nombre: "Tortas Especiales",
            id: "Tortas Especiales"
        },
        menu: {
            we: "especiales",
            nom: "Especiales"
        },
        precio: 60000,
        descripcion:"Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda."
    }
];