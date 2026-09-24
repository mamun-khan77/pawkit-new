import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // Create a default seller
  const seller = await prisma.user.upsert({
    where: { email: 'seller@pawkit.com' },
    update: {},
    create: {
      name: 'Pawkit Official',
      email: 'seller@pawkit.com',
      passwordHash,
      phone: '01700000000',
      district: 'Dhaka',
      role: 'SELLER',
    },
  });

  const petsData = [
    { name: "Biscuit", breed: "Labrador Retriever", category: "DOG", age: 3, ageUnit: "MONTHS", gender: "Male", price: 25000, description: "Friendly and playful.", status: "ACTIVE", listingType: "SALE", district: "Dhaka", image: "/src/assets/pet-1.jpg" },
    { name: "Snowy", breed: "Persian Cat", category: "CAT", age: 4, ageUnit: "MONTHS", gender: "Female", price: 18000, description: "Sweet and cuddly.", status: "ACTIVE", listingType: "SALE", district: "Dhaka", image: "/src/assets/pet-2.jpg" },
    { name: "Zephyr", breed: "Siberian Husky", category: "DOG", age: 5, ageUnit: "MONTHS", gender: "Male", price: 45000, description: "Energetic and smart.", status: "ACTIVE", listingType: "SALE", district: "Chittagong", image: "/src/assets/pet-3.jpg" },
    { name: "Rio", breed: "Macaw Parrot", category: "BIRD", age: 1, ageUnit: "YEARS", gender: "Male", price: 32000, description: "Talkative and colorful.", status: "ACTIVE", listingType: "SALE", district: "Dhaka", image: "/src/assets/pet-4.jpg" },
    { name: "Coco", breed: "French Bulldog", category: "DOG", age: 2, ageUnit: "MONTHS", gender: "Female", price: 55000, description: "Loyal and cute.", status: "ACTIVE", listingType: "SALE", district: "Sylhet", image: "/src/assets/pet-5.jpg" },
    { name: "Mochi", breed: "Scottish Fold", category: "CAT", age: 3, ageUnit: "MONTHS", gender: "Male", price: 22000, description: "Quiet and relaxed.", status: "ACTIVE", listingType: "SALE", district: "Dhaka", image: "/src/assets/pet-6.jpg" },
  ];

  for (const p of petsData) {
    const existing = await prisma.pet.findFirst({ where: { name: p.name, sellerId: seller.id } });
    if (!existing) {
      await prisma.pet.create({
        data: {
          name: p.name,
          breed: p.breed,
          category: p.category as any,
          age: p.age,
          ageUnit: p.ageUnit,
          gender: p.gender,
          price: p.price,
          description: p.description,
          status: p.status as any,
          listingType: p.listingType as any,
          district: p.district,
          sellerId: seller.id,
          images: {
            create: [{ url: p.image }]
          }
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
