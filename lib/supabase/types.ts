export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          comment: string | null
          date: string
          helpful_count: number | null
          id: number
          is_upvote: boolean | null
          software_id: number
          stars: number | null
          username: string | null
        }
        Insert: {
          comment?: string | null
          date?: string
          helpful_count?: number | null
          id?: number
          is_upvote?: boolean | null
          software_id: number
          stars?: number | null
          username?: string | null
        }
        Update: {
          comment?: string | null
          date?: string
          helpful_count?: number | null
          id?: number
          is_upvote?: boolean | null
          software_id?: number
          stars?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reviews_software"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_reviews_software"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_username_fkey"
            columns: ["username"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["username"]
          },
        ]
      }
      software: {
        Row: {
          added_date: string
          category: string | null
          compatibility: Json | null
          embedding: unknown | null
          fts: unknown | null
          id: number
          last_updated: string | null
          license: string | null
          name: string
          other_details: Json
          size: number | null
          tags: string[] | null
          version: string | null
        }
        Insert: {
          added_date?: string
          category?: string | null
          compatibility?: Json | null
          embedding?: unknown | null
          fts?: unknown | null
          id?: number
          last_updated?: string | null
          license?: string | null
          name: string
          other_details?: Json
          size?: number | null
          tags?: string[] | null
          version?: string | null
        }
        Update: {
          added_date?: string
          category?: string | null
          compatibility?: Json | null
          embedding?: unknown | null
          fts?: unknown | null
          id?: number
          last_updated?: string | null
          license?: string | null
          name?: string
          other_details?: Json
          size?: number | null
          tags?: string[] | null
          version?: string | null
        }
        Relationships: []
      }
      software_stats: {
        Row: {
          contributors: number | null
          downloads: number
          github_stars: number | null
          issues: number | null
          software_id: number
        }
        Insert: {
          contributors?: number | null
          downloads: number
          github_stars?: number | null
          issues?: number | null
          software_id: number
        }
        Update: {
          contributors?: number | null
          downloads?: number
          github_stars?: number | null
          issues?: number | null
          software_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_stats_software"
            columns: ["software_id"]
            isOneToOne: true
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_stats_software"
            columns: ["software_id"]
            isOneToOne: true
            referencedRelation: "software_summary"
            referencedColumns: ["id"]
          },
        ]
      }
      software_tags: {
        Row: {
          software_id: number
          tag_id: number
        }
        Insert: {
          software_id: number
          tag_id: number
        }
        Update: {
          software_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "software_tags_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "software_tags_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software_summary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "software_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      software_summary: {
        Row: {
          added_date: string | null
          category: string | null
          compatibility: string[] | null
          description: string | null
          fts: unknown | null
          icon: string | null
          id: number | null
          license: string | null
          name: string | null
          tags: string[] | null
          upvotes: number | null
          version: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      hybrid_search: {
        Args: {
          query_text: string
          query_embedding: unknown
          match_count: number
          licenses?: string[]
          categories?: string[]
          platforms?: string[]
          offset_amount?: number
          full_text_weight?: number
          semantic_weight?: number
          rrf_k?: number
        }
        Returns: {
          added_date: string | null
          category: string | null
          compatibility: string[] | null
          description: string | null
          fts: unknown | null
          icon: string | null
          id: number | null
          license: string | null
          name: string | null
          tags: string[] | null
          upvotes: number | null
          version: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

