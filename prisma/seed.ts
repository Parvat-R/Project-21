import { PrismaClient, Role, ApprovalStatus, Visibility, PaymentStatus, ModStatus } from "../src/generated/prisma/client";
import { prisma } from "@/lib/prisma";


async function main() {
  console.log("Seeding database");

  const user1 = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: "hashedpassword123",
      role: Role.ADMIN,
      walletBalance: 1000.00,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Event Organiser",
      email: "organiser@example.com",
      password: "hashedpassword123",
      role: Role.ORGANISER,
      walletBalance: 500.00,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Normal User",
      email: "user@example.com",
      password: "hashedpassword123",
      role: Role.USER,
      walletBalance: 200.00,
    },
  });


  const event1 = await prisma.event.create({
    data: {
      creatorId: user2.id,
      slug: "tech-conference-2026",
      title: "Tech Conference 2026",
      description: "A conference about latest tech trends.",
      approvalStatus: ApprovalStatus.APPROVED,
      startDatetime: new Date("2026-03-01T10:00:00Z"),
      endDatetime: new Date("2026-03-01T17:00:00Z"),
      seats: 100,
      amount: 500.00,
      visibility: Visibility.PUBLIC,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      creatorId: user2.id,
      slug: "ai-workshop-2026",
      title: "AI Workshop 2026",
      description: "Hands-on AI workshop.",
      approvalStatus: ApprovalStatus.PENDING,
      startDatetime: new Date("2026-04-10T09:00:00Z"),
      endDatetime: new Date("2026-04-10T15:00:00Z"),
      seats: 50,
      amount: 300.00,
      visibility: Visibility.INTERNAL,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      creatorId: user2.id,
      slug: "startup-meetup-2026",
      title: "Startup Meetup",
      description: "Networking event for startups.",
      approvalStatus: ApprovalStatus.APPROVED,
      startDatetime: new Date("2026-05-05T12:00:00Z"),
      endDatetime: new Date("2026-05-05T18:00:00Z"),
      seats: 75,
      amount: 200.00,
      visibility: Visibility.PUBLIC,
    },
  });


  const reg1 = await prisma.registration.create({
    data: {
      userId: user3.id,
      eventId: event1.id,
      attendance: true,
      attendanceTime: new Date(),
    },
  });

  const reg2 = await prisma.registration.create({
    data: {
      userId: user3.id,
      eventId: event3.id,
    },
  });

  const reg3 = await prisma.registration.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
    },
  });

  
  await prisma.payment.create({
    data: {
      userId: user3.id,
      eventId: event1.id,
      registrationId: reg1.id,
      paymentId: "pay_001",
      status: PaymentStatus.SUCCESS,
      amount: 500.00,
    },
  });

  await prisma.payment.create({
    data: {
      userId: user3.id,
      eventId: event3.id,
      registrationId: reg2.id,
      paymentId: "pay_002",
      status: PaymentStatus.PENDING,
      amount: 200.00,
    },
  });

  await prisma.payment.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      registrationId: reg3.id,
      paymentId: "pay_003",
      status: PaymentStatus.SUCCESS,
      amount: 500.00,
    },
  });


  await prisma.feedback.create({
    data: {
      registrationId: reg1.id,
      description: "Excellent event with great speakers!",
      stars: 5,
    },
  });


  await prisma.eventMod.create({
    data: {
      eventId: event2.id,
      status: ModStatus.UNDER_REVIEW,
      comments: "Needs approval from admin.",
    },
  });

  console.log("Seeding complet");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
