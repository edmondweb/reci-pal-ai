import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface IngredientChipProps {
  ingredient: string;
  onRemove?: (ingredient: string) => void;
  removable?: boolean;
  onClick?: (ingredient: string) => void;
  selected?: boolean;
}

export const IngredientChip = ({ 
  ingredient, 
  onRemove, 
  removable = false, 
  onClick,
  selected = false 
}: IngredientChipProps) => {
  return (
    <div 
      className={`
        inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
        ${selected 
          ? 'bg-secondary text-secondary-foreground shadow-md' 
          : 'bg-ingredient-chip text-ingredient-chip-text hover:bg-secondary/20 border border-secondary/20'
        }
        hover:shadow-md hover:-translate-y-0.5
      `}
      onClick={() => onClick?.(ingredient)}
    >
      <span>{ingredient}</span>
      {removable && (
        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(ingredient);
          }}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};