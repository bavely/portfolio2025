"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Linkedin, Github } from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {submitContactForm} from "./actions"; // Server action

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY; // Replace with actual reCAPTCHA site key

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      alert("reCAPTCHA is not ready yet.");
      return;
    }

    setLoading(true);
    const token = await executeRecaptcha("contact_form");

    const result = await submitContactForm(formData, token); // Call server action

    setLoading(false);

    if (result.success) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <NeonGradientCard className="h-[fit-content] max-w-sm items-center justify-center text-center">
      <CardHeader className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Get in Touch
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your Name"
            className="bg-gray-700 border-gray-600 text-white"
            onChange={handleChange}
            required
            value={formData.name}
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            className="bg-gray-700 border-gray-600 text-white"
            onChange={handleChange}
            required
            value={formData.email}
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            className="bg-gray-700 border-gray-600 text-white h-32"
            onChange={handleChange}
            required
            value={formData.message}
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </NeonGradientCard>
  );
}

export default function Contct() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY || ""}>
      <section className="h-screen min-h-screen w-screen flex flex-col items-center justify-center animate-fadein duration-1000 z-10">
        <ContactForm />
        <div className="flex mt-6 space-x-6">
          <a href="mailto:bavlesamy@gmail.com" className="text-gray-400 hover:text-white">
            <Mail size={24} />
          </a>
          <a href="https://www.linkedin.com/in/bavelytawfik" target="_blank" className="text-gray-400 hover:text-white">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/bavely" target="_blank" className="text-gray-400 hover:text-white">
            <Github size={24} />
          </a>
        </div>
      </section>
    </GoogleReCaptchaProvider>
  );
}