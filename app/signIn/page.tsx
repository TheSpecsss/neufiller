"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03),rgba(0,0,0,0))]" />
      
      <Card className="w-full max-w-md mx-auto transition-all duration-1000 animate-fade-in">
        <CardContent className="p-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign in to NEU Filler</h1>
          
          <p className="text-sm text-muted-foreground mb-8 text-center">
            Access your account to manage documents and templates
          </p>
          
          <Button 
            className="w-full h-12 flex items-center justify-center gap-2 mb-4 transition-all duration-200"
          >
            <span>Sign in with Google</span>
          </Button>
          
          <p className="text-xs text-muted-foreground mt-8 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;