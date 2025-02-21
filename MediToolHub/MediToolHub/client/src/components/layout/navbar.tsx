import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">MediTools</a>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/products">
              <a className="text-foreground/80 hover:text-foreground">Products</a>
            </Link>
            <Link href="/blog">
              <a className="text-foreground/80 hover:text-foreground">Blog</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground/80 hover:text-foreground">About</a>
            </Link>
            <Link href="/contact">
              <a className="text-foreground/80 hover:text-foreground">Contact</a>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {user.isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
