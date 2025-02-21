import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, insertBlogPostSchema, Product, BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function AdminPage() {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const productForm = useForm({
    resolver: zodResolver(insertProductSchema),
    defaultValues: selectedProduct || {
      name: "",
      description: "",
      price: 0,
      category: "",
      imageUrl: "",
    },
  });

  const blogForm = useForm({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: selectedPost || {
      title: "",
      content: "",
      imageUrl: "",
      authorId: 1,
      createdAt: new Date().toISOString(),
    },
  });

  async function onProductSubmit(data: any) {
    try {
      if (selectedProduct) {
        await apiRequest("PUT", `/api/products/${selectedProduct.id}`, data);
        toast({ title: "Product updated successfully" });
      } else {
        await apiRequest("POST", "/api/products", data);
        toast({ title: "Product created successfully" });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      productForm.reset();
      setSelectedProduct(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function onBlogSubmit(data: any) {
    try {
      if (selectedPost) {
        await apiRequest("PUT", `/api/blog/${selectedPost.id}`, data);
        toast({ title: "Blog post updated successfully" });
      } else {
        await apiRequest("POST", "/api/blog", data);
        toast({ title: "Blog post created successfully" });
      }
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      blogForm.reset();
      setSelectedPost(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function deleteProduct(id: number) {
    try {
      await apiRequest("DELETE", `/api/products/${id}`);
      toast({ title: "Product deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function deleteBlogPost(id: number) {
    try {
      await apiRequest("DELETE", `/api/blog/${id}`);
      toast({ title: "Blog post deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="products">
        <TabsList className="mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedProduct ? "Edit Product" : "Add Product"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...productForm}>
                  <form
                    onSubmit={productForm.handleSubmit(onProductSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={productForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={productForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit">
                        {selectedProduct ? "Update" : "Create"}
                      </Button>
                      {selectedProduct && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setSelectedProduct(null);
                            productForm.reset();
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Products List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products?.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center p-4 border rounded"
                    >
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-foreground/60">
                          ${product.price}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedProduct(product);
                            productForm.reset(product);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blog">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedPost ? "Edit Blog Post" : "Add Blog Post"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...blogForm}>
                  <form
                    onSubmit={blogForm.handleSubmit(onBlogSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={blogForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={blogForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-[200px]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={blogForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit">
                        {selectedPost ? "Update" : "Create"}
                      </Button>
                      {selectedPost && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setSelectedPost(null);
                            blogForm.reset();
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Blog Posts List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts?.map((post) => (
                    <div
                      key={post.id}
                      className="flex justify-between items-center p-4 border rounded"
                    >
                      <div>
                        <div className="font-semibold">{post.title}</div>
                        <div className="text-sm text-foreground/60">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedPost(post);
                            blogForm.reset(post);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => deleteBlogPost(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
