"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Mail, Linkedin, Github, FileUser } from "lucide-react";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Link from "next/link";
import { CONTACT_LIMITS } from "@/lib/contact-input";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Bound to the form's `submit` event, not the button's `click`.
   *
   * Previously this ran from `onClick` and called `preventDefault()` on the
   * click, which cancelled submission before the browser ran constraint
   * validation — so `required` never fired. It also meant pressing Enter in a
   * field triggered an unhandled native submit: a GET navigation that discarded
   * the message and wrote the visitor's name, email and message into the URL
   * and browser history.
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!executeRecaptcha) {
      alert("reCAPTCHA is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);

    try {
      const token = await executeRecaptcha("contact_form");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const result = await res.json();

      if (result.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // The API returns a specific reason (validation, rate limit, reCAPTCHA).
        alert(result.error ?? "Failed to send message.");
      }
    } catch {
      alert("Could not reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeonGradientCard className="h-[fit-content] max-w-sm items-center justify-center text-center ">
      <CardHeader className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        Get in Touch
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Your Name"
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-slate-200 border-slate-400 text-black"
            onChange={handleChange}
            required
            maxLength={CONTACT_LIMITS.name}
            autoComplete="name"
            value={formData.name}
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-slate-200 border-slate-400 text-black"
            onChange={handleChange}
            required
            maxLength={CONTACT_LIMITS.email}
            autoComplete="email"
            value={formData.email}
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-slate-200 border-slate-400 text-black h-32"
            onChange={handleChange}
            required
            maxLength={CONTACT_LIMITS.message}
            value={formData.message}
          />
          <Button
            type="submit"
            className="inline-flex h-12  animate-shimmer w-full items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
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
      <section className="h-screen min-h-screen w-full flex flex-col items-center justify-center animate-fadein duration-1000 z-10">
        <ContactForm />
        <div className="flex mt-6 space-x-6">
          <a href="mailto:bavlesamy@gmail.com" className="dark:text-gray-400 dark:hover:text-white text-[#1f142a] hover:text-black">
            <Mail size={24} />
          </a>
          <a href="https://www.linkedin.com/in/bavelytawfik" target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 dark:hover:text-white text-[#1f142a] hover:text-black">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/bavely" target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 dark:hover:text-white text-[#1f142a] hover:text-black">
            <Github size={24} />
          </a>
          <Link href="/resume" target="_blank" rel="noopener noreferrer" className="dark:text-gray-400 dark:hover:text-white text-[#1f142a] hover:text-black">
            <FileUser size={24} />
          </Link>
        </div>
      </section>
    </GoogleReCaptchaProvider>
  );
}
