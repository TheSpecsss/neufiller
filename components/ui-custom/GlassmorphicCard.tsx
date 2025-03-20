
import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
  animate?: boolean;
  style?: CSSProperties;
}

const GlassmorphicCard = ({
  className,
  children,
  hover = true,
  animate = false,
  style,
}: GlassmorphicCardProps) => {
  return (
    <div
      style={style}
      className={cn(
        "rounded-xl glass-panel p-6 relative overflow-hidden",
        hover && "hover-effect",
        animate && "animate-scale-in",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-black/5 dark:from-white/10 dark:to-black/10" />
    </div>
  );
};

export default GlassmorphicCard;
