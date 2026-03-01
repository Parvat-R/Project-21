import { PrismaClient, Role, ApprovalStatus, Visibility, PaymentStatus, ModStatus } from "@/app/generated/prisma/client"
import prisma from "@/lib/prisma"
import { Prisma } from "@/app/generated/prisma/client"

async function main() {
  console.log("🌱 Seeding started...")

  // =========================
  // USERS (10)
  // =========================
  const users = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: "hashed_password",
          role: i === 0 ? Role.ADMIN : Role.USER,
          walletBalance: new Prisma.Decimal(1000 + i * 100)
        }
      })
    )
  )

  // =========================
  // EVENTS (10)
  // =========================
  const events = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.event.create({
        data: {
          creatorId: users[i % users.length].id,
          slug: `event-${i + 1}`,
          title: `Event ${i + 1}`,
          description: `Description for event ${i + 1}`,
          approvalStatus: ApprovalStatus.APPROVED,
          startDatetime: new Date(),
          endDatetime: new Date(Date.now() + 24 * 60 * 60 * 1000),
          seats: 100,
          amount: new Prisma.Decimal(500),
          visibility: Visibility.PUBLIC
        }
      })
    )
  )

  // =========================
  // REGISTRATIONS (10)
  // unique (userId, eventId)
  // =========================
  const registrations = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.registration.create({
        data: {
          userId: users[i].id,
          eventId: events[i].id
        }
      })
    )
  )

  // =========================
  // PAYMENTS (10)
  // =========================
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.payment.create({
        data: {
          userId: users[i].id,
          paymentId: `PAY_${i + 1}`,
          registrationId: registrations[i].id,
          eventId: events[i].id,
          status: PaymentStatus.SUCCESS,
          amount: new Prisma.Decimal(500)
        }
      })
    )
  )

  // =========================
  // OTP VERIFICATIONS (10)
  // email must be unique
  // =========================
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.otpVerification.create({
        data: {
          email: `otpuser${i + 1}@example.com`,
          otp: Math.floor(100000 + Math.random() * 900000).toString(),
          expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }
      })
    )
  )

  // =========================
  // FEEDBACKS (10)
  // registrationId unique
  // =========================
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.feedback.create({
        data: {
          registrationId: registrations[i].id,
          description: `Great event ${i + 1}!`,
          stars: (i % 5) + 1
        }
      })
    )
  )

  // =========================
  // EVENT MODS (10)
  // =========================
  await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.eventMod.create({
        data: {
          eventId: events[i].id,
          status: ModStatus.OPEN,
          comments: `Review request for event ${i + 1}`
        }
      })
    )
  )

  console.log("✅ Seeding completed successfully.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })