
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

  const mike = await prisma.user.upsert({
    where: { email: "mike@prisma.io" },
    update: {},
    create: {
      firstName: "Mike",
      lastName: "Wazowski",
      role: "ADMIN",
      email: "mike@prisma.io",
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
      about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu luctus sem. Ut non tellus nulla. Mauris accumsan rutrum viverra. Ut sit amet facilisis sapien, vel hendrerit nisl. Integer consequat justo ut lacinia facilisis. Nulla vitae ligula non nulla accumsan iaculis sit amet quis neque. Maecenas luctus mi sit amet erat suscipit, nec pharetra nisi semper.",
    }
  })

  const PDCcheckpoint = await prisma.PDCcheckpoint.create({
    data: {
      trust: 4,
      willFollow: 2,
      retention: 3,
      commitment: 5,
      cv: 1,
      readyForInterviews: 2,
      advancement: 3,
      traineeId: Number(`${bob.id}`),
    }
  })

  const WOLcheckpoint = await prisma.WOLcheckpoint.create({
    data: {
      health: 8,
      healthFeel: "i'm feeling fine",
      healthImprove: "go to the dentist",
      work: 3,
      workFeel: "i dont have job",
      workImprove: "update my resume",
      finances: 4,
      financesthFeel: "i still have some savings",
      financesthImprove: "find the job",
      environment: 8,
      environmentFeel: "everything is fine",
      environmentImprove: "everything is fine",
      love: 3,
      loveFeel: "not interested",
      loveImprove: "find the job",
      familyFriends: 9,
      familyFriendsFeel: "everything is good, they support me",
      familyFriendsImprove: "go out more",
      personalDevelopment: 8,
      personalDevelopmentFeel: "im reading a lot and enjoy it",
      personalDevelopmentImprove: "find the job",
      fun: 2,
      funFeel: "i cant have fun before I am able to find a job",
      funImprove: "find the job",
      traineeId: Number(`${bob.id}`)
    }
  })


  const updatedPDCcheckpoit = await prisma.pDCcheckpoint.update({
    where: {
      id: PDCcheckpoint.id
    },
    data: {
      SessionNotes: {
        create: {
          id: '29384907328971302981209823190',
          topic: "Trust",
          objective: "He wants to trust people",
          actions: "Start communicating with people actively",
          notes: "He is afraid of close contact with people",
          results: "Not yet",
          evaluation: "Lets see how it goes",
        }
      }
    },
    include: {
      SessionNotes: true
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