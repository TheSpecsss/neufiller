"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, FileText, Lock, Zap } from "lucide-react";
import GlassmorphicCard from "@/components/ui-custom/GlassmorphicCard";
import AnimatedLogo from "@/components/ui-custom/AnimatedLogo";
import { Button } from "@/components/ui/button";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  });

  useEffect(() => {
    if (!session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),rgba(0,0,0,0))]" />

        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-8">
            <AnimatedLogo className="h-20 w-20" />
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="text-gradient">NEU Filler</span>
          </h1>

          <p className="text-xl sm:text-2xl text-neu-gray dark:text-neu-light-gray mb-12 max-w-2xl mx-auto">
            AI-powered document automation that streamlines your workflow and
            reduces errors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => router.push("/signIn")}>
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-neu-light-gray/50 dark:bg-neu-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassmorphicCard
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                animate={true}
                className="transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full p-3 bg-neu-light-gray dark:bg-neu-dark-gray mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neu-gray dark:text-neu-light-gray">
                    {feature.description}
                  </p>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your document workflow?
          </h2>
          <p className="text-lg text-neu-gray dark:text-neu-light-gray mb-10 max-w-2xl mx-auto">
            Start using NEU Filler today and experience the future of document
            automation.
          </p>
          <Button onClick={() => router.push("/signIn")}>
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-neu-light-gray/30 dark:bg-neu-dark-gray/30">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <AnimatedLogo className="h-8 w-8 mr-2" />
            <span className="font-medium">NEU Filler</span>
          </div>
          <div className="text-sm text-neu-gray dark:text-neu-light-gray">
            &copy; {new Date().getFullYear()} NEU Filler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "AI-Powered Document Generation",
    description:
      "Our advanced AI extracts and processes data to automatically populate templates with precision and accuracy.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with comprehensive audit logs and role-based access control for complete peace of mind.",
    icon: <Lock className="h-6 w-6" />,
  },
  {
    title: "Streamlined Workflow",
    description:
      "Reduce manual effort and errors with intelligent suggestions, validation, and easy-to-use interfaces.",
    icon: <Zap className="h-6 w-6" />,
  },
];

export default Index;
