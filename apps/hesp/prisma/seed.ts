const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      firstName: "Alice",
      lastName: "Andrews",
      role: "STAFF",
      email: "alice@prisma.io",
      password: "12345"
    }
  })

  const bob = await prisma.trainee.create({
    data: {
      firstName: "Bob",
      lastName: "Potter",
      email: "bob@prisma.io",
      phone: "+3497867853",
      registerNumber: "023/1234",
    }
  })
  console.log('alice and bob', alice, bob)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })