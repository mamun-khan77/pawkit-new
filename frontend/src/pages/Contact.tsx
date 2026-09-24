import { useState } from "react";
import { Mail, MapPin, Phone, Clock, MessageCircle, Send, Sparkles, Facebook, Instagram, Twitter } from "lucide-react";
import { Navbar } from "@/components/marketplace/Navbar";
import { Footer } from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await apiClient.post('/contact', data);
      (e.target as HTMLFormElement).reset();
      toast({ title: "Message sent! 🐾", description: "Our team will get back to you within 24 hours." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute top-10 -left-20 w-96 h-96 bg-secondary/40 animate-blob blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-accent/30 animate-blob blur-3xl opacity-50" style={{ animationDelay: "3s" }} />
          <div className="container relative py-16 md:py-24 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-secondary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>We'd love to hear from you</span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[0.95] mb-6">
              Get in <span className="text-gradient-hero">touch</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Questions about a listing, your account, or just want to say hi to our team? Drop us a message — we usually reply within a day.
            </p>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="container grid sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-4">
          <InfoCard icon={<Mail className="w-5 h-5" />} title="Email us" lines={["khanmamun.cse@gmail.com"]} />
          <InfoCard icon={<Phone className="w-5 h-5" />} title="Call us" lines={["01569122069", "Sat – Thu, 9am – 9pm"]} />
          <InfoCard icon={<MapPin className="w-5 h-5" />} title="Visit us" lines={["10/A Road, Uttara", "Sector 10, Dhaka"]} />
          <InfoCard icon={<MessageCircle className="w-5 h-5" />} title="Live chat" lines={["WhatsApp: 01569122069", "Replies in minutes"]} />
        </section>

        {/* Form + side panel */}
        <section className="container py-16 md:py-24 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-card rounded-[2rem] border-2 border-foreground/5 shadow-soft p-8 md:p-10 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">Send a message</h2>
              <p className="text-muted-foreground">Fill out the form and we'll be in touch shortly.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field id="name" label="Your name" required>
                <Input id="name" name="name" placeholder="Rahim Khan" required />
              </Field>
              <Field id="email" label="Email address" required>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </Field>
              <Field id="phone" label="Phone (optional)">
                <Input id="phone" name="phone" placeholder="+880 17xx xxx xxx" />
              </Field>
              <Field id="topic" label="What's it about?" required>
                <Select name="topic" required>
                  <SelectTrigger id="topic"><SelectValue placeholder="Select a topic" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="listing">Question about a listing</SelectItem>
                    <SelectItem value="seller">Becoming a seller</SelectItem>
                    <SelectItem value="adoption">Pet adoption</SelectItem>
                    <SelectItem value="report">Report a problem</SelectItem>
                    <SelectItem value="partnership">Partnership / press</SelectItem>
                    <SelectItem value="other">Something else</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field id="message" label="Your message" required>
              <Textarea id="message" name="message" rows={6} placeholder="Tell us how we can help..." required />
            </Field>

            <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto">
              <Send className="w-4 h-4" />
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[2rem] gradient-hero p-8 text-primary-foreground shadow-pop relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-secondary/30 rounded-full blur-2xl" />
              <Clock className="w-8 h-8 mb-4" />
              <h3 className="text-2xl mb-3">Office hours</h3>
              <ul className="space-y-2 text-sm opacity-95">
                <li className="flex justify-between"><span>Saturday – Thursday</span><span className="font-bold">9:00 – 21:00</span></li>
                <li className="flex justify-between"><span>Friday</span><span className="font-bold">14:00 – 21:00</span></li>
                <li className="flex justify-between"><span>Public holidays</span><span className="font-bold">Closed</span></li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-card border-2 border-foreground/5 p-8 shadow-soft">
              <h3 className="text-2xl mb-3">Follow us</h3>
              <p className="text-sm text-muted-foreground mb-5">Cute pet content, new listings & care tips daily.</p>
              <div className="flex gap-3">
                <SocialBtn icon={<Facebook className="w-4 h-4" />} />
                <SocialBtn icon={<Instagram className="w-4 h-4" />} />
                <SocialBtn icon={<Twitter className="w-4 h-4" />} />
              </div>
            </div>

            <div className="rounded-[2rem] bg-secondary/30 border-2 border-secondary p-8">
              <h3 className="text-xl mb-2">Lost or found a pet?</h3>
              <p className="text-sm text-muted-foreground mb-4">Use our dedicated lost-and-found channel for the fastest response.</p>
              <a href="/report">
                <Button variant="pop" size="default">Report now</Button>
              </a>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const InfoCard = ({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) => (
  <div className="bg-card rounded-3xl border-2 border-foreground/5 p-6 shadow-soft hover:shadow-pop hover:-translate-y-1 transition-all">
    <div className="w-11 h-11 rounded-2xl gradient-hero text-primary-foreground flex items-center justify-center mb-4 shadow-pop">{icon}</div>
    <h3 className="font-black text-lg mb-1">{title}</h3>
    {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
  </div>
);

const Field = ({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-bold">{label}{required && <span className="text-primary"> *</span>}</Label>
    {children}
  </div>
);

const SocialBtn = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:gradient-hero hover:text-primary-foreground transition-all">{icon}</a>
);

export default Contact;