import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Medical Blog</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {posts?.map((post) => (
          <Card key={post.id}>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
              <p className="text-foreground/60 mb-4">
                {post.content.substring(0, 200)}...
              </p>
              <div className="text-sm text-foreground/60">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
