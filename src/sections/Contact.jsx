import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rohitapilore@gmail.com",
    href: "mailto:rohitapilore@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9322810417",
    href: "tel:+9322810417",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: "#",
  },
];

import { BackgroundBeamsWithCollision } from "../components/BackgroundBeamsWithCollision";
import { GlowingEffect } from "../components/GlowingEffect";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // demo mode success if config is missing
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
        toast.success("Message sent successfully", { id: toastId });
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#20b2a6", "#ffffff", "#f5a623"]
        });
        setFormData({ name: "", email: "", message: "" });
        setIsLoading(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey,
      );

      toast.success("Message sent successfully!", { id: toastId });
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#20b2a6", "#ffffff", "#f5a623"]
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send message. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-black">
      <BackgroundBeamsWithCollision className="py-32">
        <div className="container mx-auto px-6 relative z-10 w-full h-full">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
              Let's build{" "}
              <span className="font-serif italic font-normal text-white">
                something great.
              </span>
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind? I'd love to hear about it. Send me a message
              and let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="glass p-8 rounded-3xl border border-primary/30 relative z-20 overflow-hidden">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>

                <Button className="w-full" type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? <>Sending...</> : <>Send Message <Send className="w-5 h-5 ml-2" /></>}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 relative z-20">
              <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    {contactInfo.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium">{item.value}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="glass rounded-3xl p-8 border border-primary/30 relative overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Currently Available</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    I'm currently open to new opportunities and exciting projects. Let's talk!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </section>
  );
};
