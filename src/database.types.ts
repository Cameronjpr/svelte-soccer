export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Selections: {
        Row: {
          created_at: string | null
          fixture: number | null
          gameweek: number | null
          id: number
          selection: number | null
          selector: string | null
        }
        Insert: {
          created_at?: string | null
          fixture?: number | null
          gameweek?: number | null
          id?: number
          selection?: number | null
          selector?: string | null
        }
        Update: {
          created_at?: string | null
          fixture?: number | null
          gameweek?: number | null
          id?: number
          selection?: number | null
          selector?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Selections_selector_fkey"
            columns: ["selector"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Users: {
        Row: {
          auth_user: string | null
          created_at: string | null
          email: string | null
          id: number
          score: number | null
          selections: number[] | null
          username: string | null
        }
        Insert: {
          auth_user?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          score?: number | null
          selections?: number[] | null
          username?: string | null
        }
        Update: {
          auth_user?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          score?: number | null
          selections?: number[] | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Users_auth_user_fkey"
            columns: ["auth_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calc_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
