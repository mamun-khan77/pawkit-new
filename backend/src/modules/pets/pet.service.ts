import prisma from '../../utils/prisma';

export class PetService {
  static async getAllPets() {
    return prisma.pet.findMany({
      include: {
        images: true,
        seller: { select: { id: true, name: true, email: true, district: true } },
      },
    });
  }

  static async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        images: true,
        seller: { select: { id: true, name: true, email: true, district: true } },
      },
    });
    if (!pet) throw new Error('Pet not found');
    return pet;
  }

  static async createPet(sellerId: string, data: any) {
    const { images, ...petData } = data;
    
    return prisma.pet.create({
      data: {
        ...petData,
        sellerId,
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: {
        images: true,
      },
    });
  }

  static async updatePet(id: string, sellerId: string, data: any) {
    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) throw new Error('Pet not found');
    if (pet.sellerId !== sellerId) throw new Error('Unauthorized to update this pet');

    const { images, ...petData } = data;

    // A real implementation would handle images more carefully (deleting old ones, etc.)
    return prisma.pet.update({
      where: { id },
      data: petData,
    });
  }

  static async deletePet(id: string, sellerId: string) {
    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) throw new Error('Pet not found');
    if (pet.sellerId !== sellerId) throw new Error('Unauthorized to delete this pet');

    return prisma.pet.delete({ where: { id } });
  }
}
