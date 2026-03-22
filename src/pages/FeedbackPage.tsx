import { useState } from "react";
import { Navbar } from "@/components/blocks/Navbar";
import { Footer } from "@/components/blocks/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedbackService } from "@/services/FeedbackService";
import { Star, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, X } from "lucide-react";

export function FeedbackPage() {
  const [bookingCode, setBookingCode] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCode || !email || !title || !description) {
      setErrorMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const requestData = {
        bookingCode: bookingCode.trim(),
        email: email.trim(),
        title: title.trim(),
        description: description.trim(),
        rating,
      };

      const formData = new FormData();
      formData.append(
        "request",
        new Blob([JSON.stringify(requestData)], { type: "application/json" })
      );

      images.forEach((file) => {
        formData.append("files", file);
      });

      await FeedbackService.createFeedback(formData);
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to submit feedback. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col font-sans selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 pt-20 pb-16 lg:pt-32 lg:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 size-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 animate-pulse"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            <div className="max-w-3xl w-full text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <MessageSquare className="size-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Customer Feedback</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">
                Share your <span className="text-primary not-italic">Story</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                We'd love to hear about your foodie adventure with us!
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="container mx-auto px-6 -mt-10 mb-20 relative z-20">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 dark:shadow-none relative">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10 animate-in zoom-in-95 duration-500">
                <CheckCircle2 className="size-20 text-green-500 mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                  Thank You!
                </h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Your feedback has been successfully submitted. We appreciate your time and insights!
                </p>
                <Button
                  onClick={() => {
                    setStatus("idle");
                    setBookingCode("");
                    setTitle("");
                    setDescription("");
                    setRating(5);
                    setImages([]);
                  }}
                  className="h-14 px-10 rounded-2xl font-black uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  Submit Another Update
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold flex items-start gap-3 animate-in fade-in duration-300">
                    <AlertCircle className="size-5 shrink-0 mt-0.5" />
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground uppercase tracking-widest">
                      Booking Code
                    </label>
                    <Input
                      placeholder="e.g. BK-12345"
                      value={bookingCode}
                      onChange={(e) => setBookingCode(e.target.value)}
                      required
                      className="h-14 bg-secondary/50 border-border rounded-xl focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground uppercase tracking-widest">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-14 bg-secondary/50 border-border rounded-xl focus-visible:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-foreground uppercase tracking-widest">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`size-10 ${
                            star <= rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-300 dark:text-slate-700"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-foreground uppercase tracking-widest">
                    Summary Title
                  </label>
                  <Input
                    placeholder="e.g. Amazing Food Tour!"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="h-14 bg-secondary/50 border-border rounded-xl focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-foreground uppercase tracking-widest">
                    Detailed Review
                  </label>
                  <textarea
                    placeholder="Tell us what you loved about the tour..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[150px] p-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm w-full font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-foreground uppercase tracking-widest">
                    Upload Photos (Optional)
                  </label>
                  <div className="flex flex-wrap gap-4 items-start">
                    {images.map((file, idx) => (
                      <div key={idx} className="relative group size-24 shrink-0 rounded-xl overflow-hidden border border-border">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-6 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="size-24 shrink-0 rounded-xl border-2 border-dashed border-border hover:border-primary flex flex-col items-center justify-center cursor-pointer transition-colors bg-secondary/20 hover:bg-secondary/50">
                      <ImageIcon className="size-6 text-muted-foreground mb-1" />
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">Add Photo</span>
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp" 
                        multiple 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files) {
                            setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
                          }
                          e.target.value = ""; // Reset value so the same file can be selected again if needed
                        }}
                      />
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-6"
                >
                  {status === "submitting" ? (
                    <Loader2 className="size-6 animate-spin" />
                  ) : (
                    <>
                      <Send className="size-5 mr-3" /> Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
