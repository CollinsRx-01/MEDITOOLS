import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  isBusinessAccount: boolean("is_business_account").notNull().default(false),
  businessName: text("business_name"),
  address: text("address"),
  allowNotifications: boolean("allow_notifications").notNull().default(true),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  authorId: integer("author_id").notNull(),
  createdAt: text("created_at").notNull(),
});

// Updated schema for user registration
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    password: true,
    firstName: true,
    lastName: true,
    isBusinessAccount: true,
    businessName: true,
    address: true,
    allowNotifications: true,
  })
  .extend({
    businessName: z.string().optional(),
    address: z.string().optional(),
  });

export const insertProductSchema = createInsertSchema(products);
export const insertBlogPostSchema = createInsertSchema(blogPosts);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;