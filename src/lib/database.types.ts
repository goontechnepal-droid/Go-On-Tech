// Shape produced by `supabase gen types typescript` for supabase/migrations/0001_init.sql.
// Regenerate after any schema change:
//   npx supabase gen types typescript --project-id <ref> > src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string;
          id: string;
          is_published: boolean;
          logo_url: string | null;
          name: string;
          sector: string;
          slug: string;
          sort_order: number;
          website_url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          logo_url?: string | null;
          name: string;
          sector: string;
          slug: string;
          sort_order?: number;
          website_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          logo_url?: string | null;
          name?: string;
          sector?: string;
          slug?: string;
          sort_order?: number;
          website_url?: string | null;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          company: string | null;
          created_at: string;
          details: Json;
          email: string;
          id: string;
          message: string | null;
          name: string;
          phone: string | null;
          service_slugs: string[];
          source_path: string | null;
          status: string;
          type: string;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          details?: Json;
          email: string;
          id?: string;
          message?: string | null;
          name: string;
          phone?: string | null;
          service_slugs?: string[];
          source_path?: string | null;
          status?: string;
          type: string;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          details?: Json;
          email?: string;
          id?: string;
          message?: string | null;
          name?: string;
          phone?: string | null;
          service_slugs?: string[];
          source_path?: string | null;
          status?: string;
          type?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          category: string;
          created_at: string;
          deliverables: string[];
          description: string;
          faqs: Json;
          features: Json;
          icon: string;
          id: string;
          industries: string[];
          is_featured: boolean;
          is_published: boolean;
          priority: number;
          process: Json;
          slug: string;
          summary: string;
          tagline: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          deliverables?: string[];
          description?: string;
          faqs?: Json;
          features?: Json;
          icon: string;
          id?: string;
          industries?: string[];
          is_featured?: boolean;
          is_published?: boolean;
          priority: number;
          process?: Json;
          slug: string;
          summary: string;
          tagline: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          deliverables?: string[];
          description?: string;
          faqs?: Json;
          features?: Json;
          icon?: string;
          id?: string;
          industries?: string[];
          is_featured?: boolean;
          is_published?: boolean;
          priority?: number;
          process?: Json;
          slug?: string;
          summary?: string;
          tagline?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      touch_updated_at: {
        Args: Record<PropertyKey, never>;
        Returns: unknown;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
