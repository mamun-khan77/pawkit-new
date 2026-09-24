import pet1 from "@/assets/pet-1.jpg";
import pet2 from "@/assets/pet-2.jpg";
import pet3 from "@/assets/pet-3.jpg";
import pet4 from "@/assets/pet-4.jpg";
import pet5 from "@/assets/pet-5.jpg";
import pet6 from "@/assets/pet-6.jpg";

export type Pet = {
  id: string;
  name: string;
  breed: string;
  category: "Dogs" | "Cats" | "Birds" | "Small Pets";
  age: string;
  gender: "Male" | "Female";
  price: number;
  location: string;
  image: string;
  vaccinated: boolean;
  featured?: boolean;
};

export const pets: Pet[] = [
  { id: "1", name: "Biscuit", breed: "Labrador Retriever", category: "Dogs", age: "3 months", gender: "Male", price: 25000, location: "Dhaka, Gulshan", image: pet1, vaccinated: true, featured: true },
  { id: "2", name: "Snowy", breed: "Persian Cat", category: "Cats", age: "4 months", gender: "Female", price: 18000, location: "Dhaka, Banani", image: pet2, vaccinated: true, featured: true },
  { id: "3", name: "Zephyr", breed: "Siberian Husky", category: "Dogs", age: "5 months", gender: "Male", price: 45000, location: "Chittagong", image: pet3, vaccinated: true, featured: true },
  { id: "4", name: "Rio", breed: "Macaw Parrot", category: "Birds", age: "1 year", gender: "Male", price: 32000, location: "Dhaka, Dhanmondi", image: pet4, vaccinated: false },
  { id: "5", name: "Coco", breed: "French Bulldog", category: "Dogs", age: "2 months", gender: "Female", price: 55000, location: "Sylhet", image: pet5, vaccinated: true, featured: true },
  { id: "6", name: "Mochi", breed: "Scottish Fold", category: "Cats", age: "3 months", gender: "Male", price: 22000, location: "Dhaka, Uttara", image: pet6, vaccinated: true },
];
