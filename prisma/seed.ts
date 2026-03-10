// prisma/seed.ts
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

async function main() {
  console.log("🧹 Cleaning up database...");
  // Use a transaction for cleanup to be safe
  await prisma.$transaction([
    prisma.feedback.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.eventMod.deleteMany(),
    prisma.registration.deleteMany(),
    prisma.event.deleteMany(),
    prisma.user.deleteMany(),
    prisma.otpVerification.deleteMany(),
  ]);

  const passwordHash = await bcrypt.hash("password123", 10);

  // --- USERS ---
  const users = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: passwordHash,
          role: "USER",
          image:
            "https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png",
        },
      }),
    ),
  );

  const organisers = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `Organiser ${i + 1}`,
          email: `organiser${i + 1}@example.com`,
          password: passwordHash,
          role: "ORGANISER",
          image:
            "https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png",
        },
      }),
    ),
  );

  const customAdminPasswordHash = await bcrypt.hash("Sadha@123$", 10);
  const specificAdmin = await prisma.user.create({
    data: {
      name: "Sadhasivam Admin",
      email: "sadhasivam.a07@gmail.com",
      password: customAdminPasswordHash,
      role: "ADMIN",
      image:
        "https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png",
    },
  });

  const admins = [
    specificAdmin,
    ...(await Promise.all(
      Array.from({ length: 2 }).map((_, i) =>
        prisma.user.create({
          data: {
            name: `Admin ${i + 1}`,
            email: `admin${i + 1}@example.com`,
            password: passwordHash,
            role: "ADMIN",
            image:
              "https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png",
          },
        }),
      ),
    )),
  ];

  // --- EVENTS ---
  const events = await Promise.all(
    organisers.flatMap((org, i) =>
      Array.from({ length: 3 }).map((_, j) =>
        prisma.event.create({
          data: {
            creatorId: org.id,
            slug: `event-${i + 1}-${j + 1}`,
            title: `Event ${i + 1}-${j + 1}`,
            description: `Demo description for event ${i + 1}-${j + 1}`,
            startDatetime: new Date(Date.now() + (i + j + 1) * 86400000),
            endDatetime: new Date(Date.now() + (i + j + 2) * 86400000),
            imageUrl:
              "https://res.cloudinary.com/djfefn9qx/image/upload/v1773122893/event_f0q2gq.png",
            seats: 100,
            amount: 200.0,
            visibility: j % 2 === 0 ? "PUBLIC" : "INTERNAL",
            approvalStatus: j % 2 === 0 ? "APPROVED" : "PENDING",
          },
        }),
      ),
    ),
  );

  // --- REGISTRATIONS + PAYMENTS + FEEDBACK ---
  await Promise.all(
    users.map((user, i) =>
      prisma.registration.create({
        data: {
          userId: user.id,
          eventId: events[i % events.length].id,
          attendance: i % 2 === 0,
          payment: {
            create: {
              userId: user.id,
              eventId: events[i % events.length].id,
              paymentId: `PAY-${i + 1}`,
              status: i % 3 === 0 ? "SUCCESS" : "PENDING",
              amount: 200.0,
            },
          },
          feedback:
            i % 2 === 0
              ? {
                  create: {
                    description: `Feedback from user ${i + 1}`,
                    stars: (i % 5) + 1,
                  },
                }
              : undefined,
        },
      }),
    ),
  );

  // --- EVENT MODERATION ---
  await Promise.all(
    events.map((event, i) =>
      prisma.eventMod.create({
        data: {
          eventId: event.id,
          status: i % 2 === 0 ? "UNDER_REVIEW" : "OPEN",
          comments: i % 2 === 0 ? "Needs more details" : "Initial submission",
        },
      }),
    ),
  );

  console.log("✅ Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
