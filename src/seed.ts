const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cities = [
    {
      "name": "VILCABAMBA(VICTORIA)"
    },
    {
      "name": "QUINARA"
    },
    {
      "name": "MALACATOS(VALLADOLID)"
    },
    {
      "name": "CHUQUIRIBAMBA"
    },
    {
      "name": "TAQUIL(MIGUEL RIOFRIO)"
    },
    {
      "name": "LOJA"
    },
    {
      "name": "EL TAMBO"
    },
    {
      "name": "CATAMAYO (LATOMA)"
    },
    {
      "name": "ZAMBI"
    },
    {
      "name": "SAN PEDRO DE LA BENDITA"
    },
    {
      "name": "CHAGUARPAMBA"
    }
  ]
  

async function main() {
  for (const city of cities) {
    await prisma.city.create({
      data: city,
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
