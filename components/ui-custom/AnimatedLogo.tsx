
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className }: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Animation variables
    let frame = 0;
    const totalFrames = 120;
    let animationId: number;
    
    const isDarkMode = document.documentElement.classList.contains("dark");
    const strokeColor = isDarkMode ? "#FFFFFF" : "#000000";
    const fillColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    
    const drawN = (progress: number) => {
      const size = Math.min(rect.width, rect.height);
      const lineWidth = size / 20;
      
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      
      // Draw N shape with animation
      const startX = size * 0.2;
      const endX = size * 0.8;
      const topY = size * 0.2;
      const bottomY = size * 0.8;
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw background circle with subtle pulsing
      const pulseScale = 0.95 + Math.sin(progress * Math.PI * 2) * 0.05;
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.arc(rect.width / 2, rect.height / 2, size * 0.4 * pulseScale, 0, Math.PI * 2);
      ctx.fill();
      
      // Left vertical line
      if (progress > 0) {
        ctx.beginPath();
        ctx.moveTo(startX, topY);
        ctx.lineTo(startX, topY + (bottomY - topY) * Math.min(1, progress * 3));
        ctx.stroke();
      }
      
      // Diagonal line
      if (progress > 0.33) {
        const diagProgress = Math.min(1, (progress - 0.33) * 3);
        ctx.beginPath();
        ctx.moveTo(startX, topY);
        ctx.lineTo(
          startX + (endX - startX) * diagProgress,
          topY + (bottomY - topY) * diagProgress
        );
        ctx.stroke();
      }
      
      // Right vertical line
      if (progress > 0.66) {
        const rightProgress = Math.min(1, (progress - 0.66) * 3);
        ctx.beginPath();
        ctx.moveTo(endX, bottomY);
        ctx.lineTo(endX, bottomY - (bottomY - topY) * rightProgress);
        ctx.stroke();
      }
    };
    
    const animate = () => {
      frame = (frame + 1) % totalFrames;
      const progress = frame / totalFrames;
      drawN(progress);
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={cn("h-8 w-8", className)}
      style={{ width: "32px", height: "32px" }}
    />
  );
};

export default AnimatedLogo;
