import { Card, CardContent } from "../ui/card";
import { motion } from 'framer-motion';

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  color: 'blue' | 'green' | 'purple';
}

 export default function RoleCard({ icon, title, description, isSelected, onClick, color }: RoleCardProps) {
  // Color config based on role type
  const colorStyles = {
    blue: {
      bgLight: 'bg-blue-50',
      bgSelected: 'bg-blue-100',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      borderSelected: 'border-blue-500',
    },
    green: {
      bgLight: 'bg-green-50',
      bgSelected: 'bg-green-100',
      iconBg: 'bg-green-100', 
      iconColor: 'text-green-600',
      borderSelected: 'border-green-500',
    },
    purple: {
      bgLight: 'bg-purple-50',
      bgSelected: 'bg-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600', 
      borderSelected: 'border-purple-500',
    },
  };

  const colors = colorStyles[color];

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-md ${
        isSelected 
          ? `${colors.bgSelected} ${colors.borderSelected} shadow-md mx-[20px] ` 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        {/* Icon with circular background */}
        <div className={`w-20 h-20 rounded-full ${colors.iconBg} flex items-center justify-center mb-4`}>
          <div className={colors.iconColor}>{icon}</div>
        </div>
        
        {/* Role title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        
        {/* Role description */}
        <p className="text-gray-600">{description}</p>
        
        {/* Selected indicator */}
        {isSelected && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-4 bg-primary text-primary-foreground rounded-full px-4 py-1 text-sm"
          >
            Selected
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}