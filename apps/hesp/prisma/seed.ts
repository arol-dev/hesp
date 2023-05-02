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

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      firstName: "Bob",
      lastName: "Potter",
      role: "ADMIN",
      email: "bob@prisma.io",
      password: "12345"
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })