import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../lib/apiClient';
import { Navbar } from '@/components/marketplace/Navbar';
import { Footer } from '@/components/marketplace/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddPet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'DOG',
    breed: '',
    age: '',
    ageUnit: 'MONTHS',
    gender: 'Male',
    price: '',
    district: user?.district || '',
    description: '',
    listingType: 'SALE',
    image: ''
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to add a pet listing.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelect = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        age: parseFloat(formData.age),
        price: parseFloat(formData.price || '0'),
        images: formData.image ? [formData.image] : [],
      };
      
      await apiClient.post('/pets', payload);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container max-w-3xl py-10">
        <h1 className="text-3xl font-bold mb-8">Add a Pet Listing</h1>
        {error && <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Pet Name</Label>
              <Input id="name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => handleSelect('category', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOG">Dog</SelectItem>
                  <SelectItem value="CAT">Cat</SelectItem>
                  <SelectItem value="BIRD">Bird</SelectItem>
                  <SelectItem value="SMALL_PET">Small Pet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="breed">Breed (optional)</Label>
              <Input id="breed" value={formData.breed} onChange={handleChange} />
            </div>
            
            <div className="space-y-2">
              <Label>Listing Type</Label>
              <Select value={formData.listingType} onValueChange={(v) => handleSelect('listingType', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SALE">For Sale</SelectItem>
                  <SelectItem value="ADOPTION">For Adoption</SelectItem>
                  <SelectItem value="REHOME">Rehoming</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="flex gap-2">
                <Input id="age" type="number" required value={formData.age} onChange={handleChange} />
                <Select value={formData.ageUnit} onValueChange={(v) => handleSelect('ageUnit', v)}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MONTHS">Months</SelectItem>
                    <SelectItem value="YEARS">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => handleSelect('gender', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (৳)</Label>
              <Input id="price" type="number" value={formData.price} onChange={handleChange} disabled={formData.listingType !== 'SALE'} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">Location (District)</Label>
              <Input id="district" required value={formData.district} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" placeholder="https://example.com/pet.jpg" value={formData.image} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={4} value={formData.description} onChange={handleChange} />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish Listing'}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
