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
      features: {
        Row: {
          description: string;
          id: number;
          software_id: number;
          title: string;
        };
        Insert: {
          description: string;
          id?: number;
          software_id: number;
          title: string;
        };
        Update: {
          description?: string;
          id?: number;
          software_id?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_features_software";
            columns: ["software_id"];
            isOneToOne: false;
            referencedRelation: "software";
            referencedColumns: ["id"];
          },
        ];
      };
      installation_instructions: {
        Row: {
          linux: string;
          macos: string;
          software_id: number;
          windows: string;
        };
        Insert: {
          linux: string;
          macos: string;
          software_id: number;
          windows: string;
        };
        Update: {
          linux?: string;
          macos?: string;
          software_id?: number;
          windows?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_installation_software";
            columns: ["software_id"];
            isOneToOne: true;
            referencedRelation: "software";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: {
          comment: string;
          date: string;
          id: number;
          is_upvote: boolean;
          software_id: number;
          username: string;
        };
        Insert: {
          comment: string;
          date: string;
          id?: number;
          is_upvote: boolean;
          software_id: number;
          username: string;
        };
        Update: {
          comment?: string;
          date?: string;
          id?: number;
          is_upvote?: boolean;
          software_id?: number;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_reviews_software";
            columns: ["software_id"];
            isOneToOne: false;
            referencedRelation: "software";
            referencedColumns: ["id"];
          },
        ];
      };
      software: {
        Row: {
          added_date: string;
          category: string | null;
          compatibility: Json | null;
          description: string;
          icon: string | null;
          id: number;
          links: Json;
          name: string;
          upvotes: number;
        };
        Insert: {
          added_date?: string;
          category?: string | null;
          compatibility?: Json | null;
          description: string;
          icon?: string | null;
          id?: number;
          links?: Json;
          name: string;
          upvotes?: number;
        };
        Update: {
          added_date?: string;
          category?: string | null;
          compatibility?: Json | null;
          description?: string;
          icon?: string | null;
          id?: number;
          links?: Json;
          name?: string;
          upvotes?: number;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          username: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          username: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
