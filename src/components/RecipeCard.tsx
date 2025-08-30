import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Recipe {
  id: string;
  title: string;
  summary: string;
  timeMinutes: number;
  servings: number;
  tags: string[];
  image?: string;
  ingredients?: string[];
  steps?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewRecipe?: (recipe: Recipe) => void;
  onToggleFavorite?: (recipeId: string) => void;
  isFavorited?: boolean;
  showFavoriteButton?: boolean;
}

export const RecipeCard = ({ 
  recipe, 
  onViewRecipe, 
  onToggleFavorite, 
  isFavorited = false,
  showFavoriteButton = true 
}: RecipeCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-recipe-card border-border/50 overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
        {recipe.image ? (
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-6xl text-primary/30 group-hover:scale-110 transition-transform duration-300">
            🍳
          </div>
        )}
        {showFavoriteButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(recipe.id);
            }}
          >
            <Heart 
              className={`h-4 w-4 ${
                isFavorited 
                  ? 'fill-primary text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`} 
            />
          </Button>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {recipe.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2">
          {recipe.summary}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.timeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs py-0.5 px-2 bg-accent text-accent-foreground"
              >
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 3 && (
              <Badge variant="outline" className="text-xs py-0.5 px-2">
                +{recipe.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          className="w-full mt-4" 
          onClick={() => onViewRecipe?.(recipe)}
          variant="default"
        >
          <ChefHat className="h-4 w-4 mr-2" />
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};