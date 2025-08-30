import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat, Heart, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { EmailSignupDialog } from "@/components/EmailSignupDialog";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const { user, signOut } = useAuth();
  const [showSignupDialog, setShowSignupDialog] = useState(false);
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
          {user && (
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
          {user ? (
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setShowSignupDialog(true)}>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="default" onClick={() => setShowSignupDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      
      <EmailSignupDialog 
        open={showSignupDialog} 
        onOpenChange={setShowSignupDialog} 
      />
    </header>
  );
};