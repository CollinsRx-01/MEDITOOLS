import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertProductSchema, insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Products
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) return res.status(404).send("Product not found");
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const parsed = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(parsed);
    res.status(201).json(product);
  });

  app.put("/api/products/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const product = await storage.updateProduct(Number(req.params.id), req.body);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    await storage.deleteProduct(Number(req.params.id));
    res.sendStatus(200);
  });

  // Blog posts
  app.get("/api/blog", async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:id", async (req, res) => {
    const post = await storage.getBlogPost(Number(req.params.id));
    if (!post) return res.status(404).send("Blog post not found");
    res.json(post);
  });

  app.post("/api/blog", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const parsed = insertBlogPostSchema.parse(req.body);
    const post = await storage.createBlogPost(parsed);
    res.status(201).json(post);
  });

  app.put("/api/blog/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    const post = await storage.updateBlogPost(Number(req.params.id), req.body);
    res.json(post);
  });

  app.delete("/api/blog/:id", async (req, res) => {
    if (!req.user?.isAdmin) return res.status(403).send("Unauthorized");
    await storage.deleteBlogPost(Number(req.params.id));
    res.sendStatus(200);
  });

  const httpServer = createServer(app);
  return httpServer;
}
