import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function HomePage() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Professional Medical Equipment
            </h1>
            <p className="text-xl text-foreground/80 mb-8">
              Discover our comprehensive range of high-quality medical tools and equipment 
              for healthcare professionals.
            </p>
            <Link href="/products">
              <Button size="lg" className="font-semibold">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products?.slice(0, 3).map((product) => (
              <Card key={product.id}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-foreground/60 mb-4">{product.description}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-foreground/60">
                All our products meet the highest medical standards
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Expert Support</h3>
              <p className="text-foreground/60">
                Professional guidance for equipment selection
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-foreground/60">
                Quick and secure worldwide shipping
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
