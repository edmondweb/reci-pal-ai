import { Button } from "@/components/ui/button";
import { ChefHat, Heart, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
}

export const Header = ({ 
  isAuthenticated = false, 
  onLogin, 
  onRegister, 
  onLogout 
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary-hover transition-colors">
          <ChefHat className="h-6 w-6" />
          ReciPal
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link 
              to="/favorites" 
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin}>
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="default" onClick={onRegister}>
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};