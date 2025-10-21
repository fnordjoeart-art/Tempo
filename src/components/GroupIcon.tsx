import { Folder, GraduationCap, Briefcase, Dumbbell, Flower2, Palette, Utensils, BookOpen, Music, Activity, Laptop, Star, Heart, Coffee, Home, Zap, Target } from 'lucide-react';

// Centralized icon mapping for group icons
export const ICON_MAP = {
  'folder': Folder,
  'graduation': GraduationCap,
  'briefcase': Briefcase,
  'dumbbell': Dumbbell,
  'flower': Flower2,
  'palette': Palette,
  'utensils': Utensils,
  'book': BookOpen,
  'music': Music,
  'activity': Activity,
  'laptop': Laptop,
  'star': Star,
  'heart': Heart,
  'coffee': Coffee,
  'home': Home,
  'zap': Zap,
  'target': Target,
} as const;

export type IconKey = keyof typeof ICON_MAP;

export interface GroupIconProps {
  icon: string;
  className?: string;
  color?: string;
  size?: number;
}

// Helper component to render group icons
export function GroupIcon({ icon, className = '', color, size }: GroupIconProps) {
  const IconComponent = ICON_MAP[icon as IconKey] || ICON_MAP.folder;
  
  return (
    <IconComponent 
      className={className}
      style={{ 
        color,
        width: size ? `${size}px` : undefined,
        height: size ? `${size}px` : undefined,
      }}
    />
  );
}

// Helper function to get icon component
export function getIconComponent(icon: string) {
  return ICON_MAP[icon as IconKey] || ICON_MAP.folder;
}
