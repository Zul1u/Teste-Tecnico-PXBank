const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const departments = await prisma.department.createMany({
    data: [
      { department_name: 'Administrativo' },
      { department_name: 'RH' },
      { department_name: 'Suporte' },
      { department_name: 'TI' },
    ],
  });

  const employees = await prisma.employees.createMany({
    data: [
      {
        name: 'Vinicius Ferreira',
        department_id: 2,
        salary: 3500,
        birth: '05/10/2000',
        cpf: '697.767.581-00',
      },
      {
        name: 'Paulo Algusto',
        department_id: 1,
        salary: 2500,
        birth: '25/07/1996',
        cpf: '192.482.273-33',
      },
      {
        name: 'Camila Pereira',
        department_id: 3,
        salary: 2000,
        birth: '31/01/1999',
        cpf: '364.643.110-50',
      },
      {
        name: 'Arthur Martins',
        department_id: 4,
        salary: 3000,
        birth: '04/11/2003',
        cpf: '330.711.617-78',
      },
    ],
  });
  console.log({ departments, employees });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
