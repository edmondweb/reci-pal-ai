import { useState } from "react";
import { Header } from "@/components/Header";
import { RecipeCard, Recipe } from "@/components/RecipeCard";
import { RecipeModal } from "@/components/RecipeModal";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// This would normally come from a database/API
const SAMPLE_FAVORITES: Recipe[] = [
  {
    id: "1",
    title: "Creamy Chicken Alfredo",
    summary: "Rich and creamy pasta dish with tender chicken in a parmesan sauce",
    timeMinutes: 25,
    servings: 4,
    tags: ["Italian", "Comfort Food", "Quick"],
  }
];

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>(SAMPLE_FAVORITES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['1']));

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleRemoveFavorite = (recipeId: string) => {
    setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(recipeId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
              <Heart className="h-8 w-8 fill-primary" />
              My Favorite Recipes
            </h1>
            <p className="text-muted-foreground mt-1">
              {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewRecipe={handleViewRecipe}
                onToggleFavorite={handleRemoveFavorite}
                isFavorited={true}
                showFavoriteButton={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start exploring recipes and save your favorites by clicking the heart icon
            </p>
            <Link to="/">
              <Button variant="hero">
                Discover Recipes
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        open={isRecipeModalOpen}
        onOpenChange={setIsRecipeModalOpen}
        onToggleFavorite={handleRemoveFavorite}
        isFavorited={selectedRecipe ? favoriteIds.has(selectedRecipe.id) : false}
      />
    </div>
  );
};

export default Favorites;