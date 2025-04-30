import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateRandomPassword = () => {
  return bcrypt.hashSync("password123", bcrypt.genSaltSync(10)); // Default password for all users
};

// Function to generate dummy data and insert it into the database
const seedDatabase = async () => {
  const numberOfUsers = 30; // You can change this number to create more users

  // Create 100 dummy users using faker
  const users = Array.from({ length: numberOfUsers }).map(() => {
    const name = faker.person.firstName();
    const email = faker.internet.email();
    const password = generateRandomPassword();
    const createdAt = faker.date.past();
    const updatedAt = faker.date.recent();

    return {
      name,
      email,
      password,
      createdAt,
      updatedAt,
    };
  });

  // Insert the users into the database
  try {
    console.log(`Inserting ${numberOfUsers} users into the database...`);
    await prisma.user.createMany({
      data: users,
    });
    console.log("Dummy users successfully inserted!");
  } catch (error) {
    console.error("Error inserting dummy users:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seeding function
seedDatabase().catch((e) => {
  console.error(e);
  process.exit(1);
});
