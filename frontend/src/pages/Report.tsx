import { useState, useEffect } from "react";
import { Navbar } from "@/components/marketplace/Navbar";
import { Footer } from "@/components/marketplace/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";
import { AlertTriangle, MapPin, Phone } from "lucide-react";

interface Report {
  id: string;
  reportType: 'LOST' | 'FOUND';
  petName?: string;
  species: string;
  description: string;
  lastSeenLocation: string;
  lastSeenDate: string;
  contactName: string;
  contactPhone: string;
  imageUrl?: string;
  createdAt: string;
}

const ReportPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState<string>('LOST');

  const fetchReports = async () => {
    try {
      const response = await apiClient.get('/reports');
      setReports(response.data.data);
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Explicitly set reportType from state
    data.reportType = reportType;

    try {
      await apiClient.post('/reports', data);
      (e.target as HTMLFormElement).reset();
      toast({ title: "Report submitted! 🐾", description: "Your report has been added to our database." });
      fetchReports();
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit report. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-16 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Lost & Found <span className="text-gradient-hero">Pets</span></h1>
          <p className="text-muted-foreground text-lg">Help reunite pets with their families. Report a lost or found pet below.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start">
          <form onSubmit={handleSubmit} className="bg-card rounded-[2rem] border-2 border-foreground/5 shadow-soft p-8 space-y-5">
            <h2 className="text-2xl font-bold mb-2">Submit a Report</h2>
            
            <div className="space-y-2">
              <Label htmlFor="reportType" className="font-bold">I have...</Label>
              <Select name="reportType" required value={reportType} onValueChange={setReportType}>
                <SelectTrigger><SelectValue placeholder="Lost or Found?" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOST">Lost a pet</SelectItem>
                  <SelectItem value="FOUND">Found a pet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName" className="font-bold">Pet Name</Label>
                <Input id="petName" name="petName" placeholder="(If known)" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="species" className="font-bold">Species *</Label>
                <Input id="species" name="species" placeholder="Dog, Cat, etc." required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold">Description *</Label>
              <Textarea id="description" name="description" placeholder="Color, breed, unique marks..." required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lastSeenLocation" className="font-bold">Last Seen Location *</Label>
                <Input id="lastSeenLocation" name="lastSeenLocation" placeholder="Area, street..." required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastSeenDate" className="font-bold">Date *</Label>
                <Input id="lastSeenDate" name="lastSeenDate" type="date" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="font-bold">Your Name *</Label>
                <Input id="contactName" name="contactName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="font-bold">Your Phone *</Label>
                <Input id="contactPhone" name="contactPhone" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="font-bold">Photo URL (optional)</Label>
              <Input id="imageUrl" name="imageUrl" placeholder="https://..." />
            </div>

            <Button type="submit" variant="pop" size="lg" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Recent Reports</h2>
            {loading ? (
              <p>Loading reports...</p>
            ) : reports.length === 0 ? (
              <div className="p-8 text-center bg-muted rounded-3xl border border-dashed border-border text-muted-foreground">
                No reports found.
              </div>
            ) : (
              <div className="grid gap-4">
                {reports.map((report) => (
                  <div key={report.id} className="bg-card rounded-2xl border-2 border-foreground/5 p-5 flex gap-5 shadow-sm">
                    {report.imageUrl ? (
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                        <img src={report.imageUrl} alt="Pet" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <AlertTriangle className="text-muted-foreground w-8 h-8 opacity-50" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black px-2 py-1 rounded-md ${report.reportType === 'LOST' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                            {report.reportType}
                          </span>
                          <h3 className="font-bold text-lg">{report.petName || `Unknown ${report.species}`}</h3>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{report.description}</p>
                      
                      <div className="flex gap-4 text-xs font-semibold text-muted-foreground">
                        <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {report.lastSeenLocation}</div>
                        <div className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {report.contactPhone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportPage;
