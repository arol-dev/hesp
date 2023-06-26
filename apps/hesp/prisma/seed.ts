const {
  HousingSituation,
  UserRole,
  WorkingSituation,
} = require("@prisma/client");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

const hashPsw = async (password: string) => await bcrypt.hash(password, 10);

const prisma = new PrismaClient();
async function main() {
  const mike = await prisma.user.upsert({
    where: { email: "mike@prisma.io" },
    update: {},
    create: {
      firstName: "Mike",
      lastName: "Wazowski",
      role: UserRole.ADMIN,
      email: "mike@prisma.io",
      password: await hashPsw("12345"),
      // picture: faker.image.urlLoremFlickr({ category: "people" }),
      picture: "/base-profile-pics/mike.jpg",
    },
  });
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      firstName: "Alice",
      lastName: "Andrews",
      role: UserRole.STAFF,
      email: "alice@prisma.io",
      password: await hashPsw("12345"),
      // picture: faker.image.urlLoremFlickr({ category: "people" }),
      picture: "/base-profile-pics/alice.jpg",
    },
  });

  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: UserRole.STAFF,
        email: faker.internet.email(),
        password: await hashPsw("12345"),
        // picture: faker.image.urlLoremFlickr({ category: "people" }),
        picture: `/base-profile-pics/coach-${i + 1}.jpg`,
      },
    });
  }

  const bob = await prisma.trainee.create({
    data: {
      firstName: "Bob",
      lastName: "Potter",
      email: "bob@prisma.io",
      phone: "+3497867853",
      registerNumber: "023/1234",
      about:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      coachId: Number(`${alice.id}`),
      // picture: faker.image.urlLoremFlickr({ category: "people" }),
      picture: `/base-profile-pics/bob.jpg`,
    },
  });

  const john = await prisma.trainee.create({
    data: {
      firstName: "John",
      lastName: "Williams",
      email: "john@prisma.io",
      phone: "+3497438963478853",
      registerNumber: "023/19764",
      about:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      coachId: Number(`${alice.id}`),
      picture: `/base-profile-pics/john.jpg`,
    },
  });

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
    },
  });

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
      traineeId: Number(`${bob.id}`),
    },
  });

  const updatedPDCcheckpoint = await prisma.pDCcheckpoint.update({
    where: {
      id: PDCcheckpoint.id,
    },
    data: {
      SessionNotes: {
        create: {
          topic: "Trust",
          objective: "He wants to trust people",
          actions: "Start communicating with people actively",
          notes: "He is afraid of close contact with people",
          results: "Not yet",
          evaluation: "Lets see how it goes",
        },
      },
    },
    include: {
      SessionNotes: true,
    },
  });

  // Trainees
  for (let i = 0; i < 10; i++) {
    const coachId = faker.number.int({ min: 2, max: 7 });
    const trainee = await prisma.trainee.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number("+36 6## ### ###"),
        registerNumber: faker.string.uuid(),
        about: faker.lorem.paragraph(),
        // picture: faker.image.urlLoremFlickr({ category: "people" }),
        picture: `/base-profile-pics/trainee-${i + 1}.jpg`,
        coachId,
        TraineeMetaData: {
          create: {
            workingSituation: faker.helpers.arrayElement(
              Object.values(WorkingSituation)
            ),
            housingSituation: faker.helpers.arrayElement(
              Object.values(HousingSituation)
            ),
            needWork: faker.datatype.boolean(),
            needTraining: faker.datatype.boolean(),
            needHousing: faker.datatype.boolean(),
            needCommunication: faker.datatype.boolean(),
            needLegal: faker.datatype.boolean(),
            needTransportation: faker.datatype.boolean(),
            needBasicAssistance: faker.datatype.boolean(),
            needSOS: faker.datatype.boolean(),
            helpCandidate: faker.datatype.boolean(),
            filledForms: faker.datatype.boolean(),
            helpAccepted: faker.datatype.boolean(),
          },
        },
      },
    });

    // Checkpoints for each trainee
    for (let j = 0; j < 3; j++) {
      await prisma.WOLcheckpoint.create({
        data: {
          health: faker.number.int(10),
          healthFeel: faker.lorem.sentence(),
          healthImprove: faker.lorem.sentence(),
          work: faker.number.int(10),
          workFeel: faker.lorem.sentence(),
          workImprove: faker.lorem.sentence(),
          finances: faker.number.int(10),
          financesthFeel: faker.lorem.sentence(),
          financesthImprove: faker.lorem.sentence(),
          environment: faker.number.int(10),
          environmentFeel: faker.lorem.sentence(),
          environmentImprove: faker.lorem.sentence(),
          love: faker.number.int(10),
          loveFeel: faker.lorem.sentence(),
          loveImprove: faker.lorem.sentence(),
          familyFriends: faker.number.int(10),
          familyFriendsFeel: faker.lorem.sentence(),
          familyFriendsImprove: faker.lorem.sentence(),
          personalDevelopment: faker.number.int(10),
          personalDevelopmentFeel: faker.lorem.sentence(),
          personalDevelopmentImprove: faker.lorem.sentence(),
          fun: faker.number.int(10),
          funFeel: faker.lorem.sentence(),
          funImprove: faker.lorem.sentence(),
          traineeId: trainee.id,
          createdAt: faker.date.recent({ days: 60 }),
        },
      });

      await prisma.pDCcheckpoint.create({
        data: {
          trust: faker.number.int(5),
          willFollow: faker.number.int(5),
          retention: faker.number.int(5),
          commitment: faker.number.int(5),
          cv: faker.number.int(5),
          readyForInterviews: faker.number.int(5),
          advancement: faker.number.int(5),
          traineeId: trainee.id,
          createdAt: faker.date.recent({ days: 60 }),
        },
      });
    }
  }
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
