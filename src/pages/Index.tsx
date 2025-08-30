import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { RecipeCard, Recipe } from "@/components/RecipeCard";
import { IngredientChip } from "@/components/IngredientChip";
import { RecipeModal } from "@/components/RecipeModal";
import { Search, Sparkles, Clock, Users } from "lucide-react";
import heroImage from "@/assets/hero-ingredients.jpg";

// Sample data for demo
const POPULAR_INGREDIENTS = [
  "Chicken", "Tomatoes", "Garlic", "Onions", "Rice", "Pasta", "Eggs", "Cheese",
  "Bell Peppers", "Spinach", "Mushrooms", "Potatoes", "Carrots", "Broccoli"
];

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Creamy Chicken Alfredo",
    summary: "Rich and creamy pasta dish with tender chicken in a parmesan sauce",
    timeMinutes: 25,
    servings: 4,
    tags: ["Italian", "Comfort Food", "Quick"],
    ingredients: [
      "2 chicken breasts, sliced",
      "12oz fettuccine pasta",
      "1 cup heavy cream",
      "1 cup parmesan cheese, grated",
      "3 cloves garlic, minced",
      "2 tbsp butter"
    ],
    steps: [
      "Cook pasta according to package directions",
      "Season and cook chicken until golden brown",
      "Sauté garlic in butter until fragrant",
      "Add cream and simmer until slightly thickened",
      "Stir in parmesan cheese until melted",
      "Combine pasta, chicken, and sauce. Serve hot"
    ]
  },
  {
    id: "2", 
    title: "Mediterranean Veggie Bowl",
    summary: "Fresh and healthy bowl with roasted vegetables and quinoa",
    timeMinutes: 30,
    servings: 2,
    tags: ["Vegetarian", "Healthy", "Mediterranean"],
    ingredients: [
      "1 cup quinoa",
      "1 zucchini, diced",
      "1 bell pepper, sliced", 
      "1 cup cherry tomatoes",
      "1/2 red onion, sliced",
      "1/4 cup feta cheese",
      "2 tbsp olive oil"
    ],
    steps: [
      "Cook quinoa according to package directions",
      "Toss vegetables with olive oil, salt, and pepper", 
      "Roast vegetables at 400°F for 20 minutes",
      "Serve quinoa topped with roasted vegetables",
      "Sprinkle with feta cheese and fresh herbs"
    ]
  },
  {
    id: "3",
    title: "Quick Fried Rice", 
    summary: "Easy fried rice using leftover rice and simple ingredients",
    timeMinutes: 15,
    servings: 3,
    tags: ["Asian", "Quick", "Leftover-Friendly"],
    ingredients: [
      "3 cups cooked rice (day-old preferred)",
      "2 eggs, beaten",
      "1 cup mixed vegetables",
      "2 green onions, chopped",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil"
    ],
    steps: [
      "Heat oil in a large pan or wok",
      "Scramble eggs and set aside",
      "Stir-fry vegetables until tender-crisp",
      "Add rice and break up clumps",
      "Stir in soy sauce and sesame oil",
      "Add eggs back in and garnish with green onions"
    ]
  }
];

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>(SAMPLE_RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleIngredientSelect = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleIngredientRemove = (ingredient: string) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const handleAddCustomIngredient = () => {
    if (customIngredient.trim() && !selectedIngredients.includes(customIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) return;
    
    setIsGenerating(true);
    // Simulate API call - in real app, this would call OpenAI API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo, just show existing recipes
    setRecipes(SAMPLE_RECIPES);
    setIsGenerating(false);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const handleToggleFavorite = (recipeId: string) => {
    if (!isAuthenticated) {
      // Show login prompt
      return;
    }
    
    const newFavorites = new Set(favorites);
    if (favorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        onLogin={() => setIsAuthenticated(true)}
        onRegister={() => setIsAuthenticated(true)}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary">ReciPal</span>
                <br />
                <span className="text-foreground">Simple Recipe Recommender</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Tell us what ingredients you have, and we'll suggest 3 delicious, 
                budget-friendly recipes you can make right now.
              </p>
              
              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Under 30 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Family-sized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>AI-powered</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Fresh ingredients for cooking"
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Ingredient Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                What ingredients do you have?
              </CardTitle>
              <CardDescription className="text-base">
                Select from popular options or add your own
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Selected Ingredients */}
              {selectedIngredients.length > 0 && (
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground mb-3">
                    Selected Ingredients ({selectedIngredients.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedIngredients.map((ingredient) => (
                      <IngredientChip
                        key={ingredient}
                        ingredient={ingredient}
                        removable
                        onRemove={handleIngredientRemove}
                        selected
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Ingredient */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add your own ingredient..."
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomIngredient()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleAddCustomIngredient}
                  disabled={!customIngredient.trim()}
                >
                  Add
                </Button>
              </div>

              {/* Popular Ingredients */}
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-3">
                  Popular Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_INGREDIENTS.filter(ing => !selectedIngredients.includes(ing)).map((ingredient) => (
                    <IngredientChip
                      key={ingredient}
                      ingredient={ingredient}
                      onClick={handleIngredientSelect}
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleGenerateRecipes}
                disabled={selectedIngredients.length === 0 || isGenerating}
              >
                <Search className="h-5 w-5 mr-2" />
                {isGenerating ? "Generating Recipes..." : "Get Recipe Suggestions"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Perfect Recipes for You
              </h2>
              <p className="text-muted-foreground">
                Here are 3 delicious recipes made with your ingredients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewRecipe={handleViewRecipe}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorited={favorites.has(recipe.id)}
                  showFavoriteButton={isAuthenticated}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        open={isRecipeModalOpen}
        onOpenChange={setIsRecipeModalOpen}
        onToggleFavorite={handleToggleFavorite}
        isFavorited={selectedRecipe ? favorites.has(selectedRecipe.id) : false}
      />
    </div>
  );
};

export default Index;