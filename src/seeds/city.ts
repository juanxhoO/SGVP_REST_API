const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cities = [
  {
    name: 'VILCABAMBA(VICTORIA)'
  },
  {
    name: 'QUINARA'
  },
  {
    name: 'MALACATOS(VALLADOLID)'
  },
  {
    name: 'CHUQUIRIBAMBA'
  },
  {
    name: 'TAQUIL(MIGUEL RIOFRIO)'
  },
  {
    name: 'LOJA'
  },
  {
    name: 'EL TAMBO'
  },
  {
    name: 'CATAMAYO (LATOMA)'
  },
  {
    name: 'ZAMBI'
  },
  {
    name: 'SAN PEDRO DE LA BENDITA'
  },
  {
    name: 'CHAGUARPAMBA'
  }
];


const spares = [
  {
    "name": "Filtro de Aceite K&N",
    "sku": "OIL-FLTR-KN-TOY-COR",
    "image": "filtro_aceite_kn_toy_cor.jpg",
    "stock": 30,
    "price": 15.50,
    "condition": "NEW",
    "brand": "K&N",
    "model": "Corolla"
  },
  {
    "name": "Pastillas de Freno Brembo",
    "sku": "BRK-PAD-BREM-HND-CIV",
    "image": "pastillas_freno_brem_hnd_civ.jpg",
    "stock": 20,
    "price": 45.00,
    "condition": "NEW",
    "brand": "Brembo",
    "model": "Civic"
  },
  {
    "name": "Filtro de Aire Mann",
    "sku": "AIR-FLTR-MANN-BMW-X5",
    "image": "filtro_aire_mann_bmw_x5.jpg",
    "stock": 25,
    "price": 30.00,
    "condition": "NEW",
    "brand": "Mann",
    "model": "X5"
  },
  {
    "name": "Amortiguador Monroe",
    "sku": "SHK-ABS-MON-FRD-ESC",
    "image": "amortiguador_mon_frd_esc.jpg",
    "stock": 10,
    "price": 80.00,
    "condition": "NEW",
    "brand": "Monroe",
    "model": "Escape"
  },
  {
    "name": "Filtro de Combustible Bosch",
    "sku": "FUEL-FLTR-BOSCH-VW-GOL",
    "image": "filtro_combustible_bosch_vw_gol.jpg",
    "stock": 15,
    "price": 25.00,
    "condition": "NEW",
    "brand": "Bosch",
    "model": "Golf"
  },
  {
    "name": "Batería Exide",
    "sku": "BAT-EXIDE-12V-60AH",
    "image": "bateria_exide_12v_60ah.jpg",
    "stock": 5,
    "price": 120.00,
    "condition": "NEW",
    "brand": "Exide",
    "model": "Universal"
  },
  {
    "name": "Faros LED Philips",
    "sku": "HEAD-LIGHT-LED-PHIL-TAC",
    "image": "faros_led_phil_tac.jpg",
    "stock": 8,
    "price": 95.00,
    "condition": "NEW",
    "brand": "Philips",
    "model": "Tacoma"
  },
  {
    "name": "Bujías NGK Iridium",
    "sku": "SPK-PLG-NGK-IRID-TYT-RAV",
    "image": "bujias_ngk_irid_tyt_rav.jpg",
    "stock": 50,
    "price": 12.00,
    "condition": "NEW",
    "brand": "NGK",
    "model": "RAV4"
  },
  {
    "name": "Aceite Sintético Mobil 1",
    "sku": "OIL-SYN-MBL1-5W30-5L",
    "image": "aceite_sintetico_mbl1_5w30_5l.jpg",
    "stock": 40,
    "price": 40.00,
    "condition": "NEW",
    "brand": "Mobil 1",
    "model": "Universal"
  },
  {
    "name": "Radiador Denso",
    "sku": "RAD-DENSO-HND-ACRD",
    "image": "radiador_denso_hnd_acrd.jpg",
    "stock": 7,
    "price": 150.00,
    "condition": "NEW",
    "brand": "Denso",
    "model": "Accord"
  }]

const maintenances = [
  {
    name: 'Mantenimiento 1',
    price: 43.59,
    details:
      'Cambio de aceite, revisión y cambio de pastillas,líquido de frenos y filtro de combustible'
  },
  {
    name: 'Mantenimiento 2',
    price: 60,
    details:
      'Mantenimiento 1 más cambio de filtro de aire cuando son vehículos, cambio del líquido refrigerante y cambio de luces delanteras y posteriores'
  },
  {
    name: 'Mantenimiento 3',
    price: 180,
    details: 'Cambio de batería y ajustes en el sistema eléctrico'
  }
];


const vehicles = [{
  "name": "Toyota RAV4 2003",
  "images": "image1",
  "chasis": "45GHJKL87TRE9",
  "model": "RAV4",
  "type": "AUTOMOVIL",
  "brand": "Toyota",
  "plate": "XYZ1234",
  "engine_cc": 2200,
  "engine": "xyz789",
  "carringcapacity": 2500,
  "passengers": 5,
  "mileage": 180000
},
{
  "name": "Honda CR-V 2004",
  "images": "image2",
  "chasis": "12ASDFG34QWE8",
  "model": "CR-V",
  "type": "AUTOMOVIL",
  "brand": "Honda",
  "plate": "ABC5678",
  "engine_cc": 2000,
  "engine": "abc456",
  "carringcapacity": 2400,
  "passengers": 5,
  "mileage": 210000
},
{
  "name": "Ford Escape 2005",
  "images": "image3",
  "chasis": "78HJQWE67TYU5",
  "model": "Escape",
  "type": "AUTOMOVIL",
  "brand": "Ford",
  "plate": "LMN9012",
  "engine_cc": 2300,
  "engine": "def123",
  "carringcapacity": 2600,
  "passengers": 5,
  "mileage": 195000
},
{
  "name": "Mazda Tribute 2002",
  "images": "image4",
  "chasis": "34ZXCVB98HGF6",
  "model": "Tribute",
  "type": "AUTOMOVIL",
  "brand": "Mazda",
  "plate": "QWE3456",
  "engine_cc": 2000,
  "engine": "ghi789",
  "carringcapacity": 2400,
  "passengers": 5,
  "mileage": 220000
},
{
  "name": "Chevrolet Equinox 2006",
  "images": "image5",
  "chasis": "56BNMLP45HGF2",
  "model": "Equinox",
  "type": "AUTOMOVIL",
  "brand": "Chevrolet",
  "plate": "RST6789",
  "engine_cc": 2400,
  "engine": "jkl012",
  "carringcapacity": 2700,
  "passengers": 5,
  "mileage": 170000
},
{
  "name": "Hyundai Tucson 2007",
  "images": "image6",
  "chasis": "67ASDFG78QWE3",
  "model": "Tucson",
  "type": "AUTOMOVIL",
  "brand": "Hyundai",
  "plate": "VWX3456",
  "engine_cc": 2000,
  "engine": "mno345",
  "carringcapacity": 2400,
  "passengers": 5,
  "mileage": 160000
}
  , {
  "name": "Kia Sportage 2002",
  "images": "dsdsd",
  "chasis": "23JDSKJ23HD1",
  "model": "Sportage",
  "type": "AUTOMOVIL",
  "brand": "Kia",
  "plate": "PDR6788",
  "engine_cc": 2000,
  "engine": "wew323",
  "carringcapacity": 2400,
  "passengers": 5,
  "mileage": 233322
}]

async function main() {
  for (const city of cities) {
    await prisma.city.create({
      data: city,
    });
  }
  for (const maintenance of maintenances) {
    await prisma.maintenance.create({
      data: maintenance
    });
  }
  for (const spare of spares) {
    await prisma.spare.create({
      data: spare
    });
  }
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle
    });
  }
  for (const vehicle of vehicles) {
    await prisma.vehicle.create({
      data: vehicle,
      subcircuits: {
        create: [
          { name: 'Subcircuit 1' },
          { name: 'Subcircuit 2' },
        ]
      }
    });
  }
}




main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
