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
      feedback: {
        Row: {
          content: string | null;
          created_at: string;
          explanation: string | null;
          feedback: number | null;
          id: number;
          image: string | null;
          status: string | null;
          tags: string[] | null;
          title: string;
          views: number | null;
          writer: string;
        };
        Insert: {
          content?: string | null;
          created_at: string;
          explanation?: string | null;
          feedback?: number | null;
          id?: number;
          image?: string | null;
          status?: string | null;
          tags?: string[] | null;
          title: string;
          views?: number | null;
          writer: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          explanation?: string | null;
          feedback?: number | null;
          id?: number;
          image?: string | null;
          status?: string | null;
          tags?: string[] | null;
          title?: string;
          views?: number | null;
          writer?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_writer_fkey';
            columns: ['writer'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      feedback_answer: {
        Row: {
          content: string | null;
          created_at: string;
          feedback: number | null;
          id: number;
          like: string[] | null;
          pick: boolean;
          writer: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          feedback?: number | null;
          id?: number;
          like?: string[] | null;
          pick?: boolean;
          writer?: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          feedback?: number | null;
          id?: number;
          like?: string[] | null;
          pick?: boolean;
          writer?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_answer_feedback_fkey';
            columns: ['feedback'];
            isOneToOne: false;
            referencedRelation: 'feedback';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feedback_answer_writer_fkey';
            columns: ['writer'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      feedback_comment: {
        Row: {
          answer: number | null;
          comment: string;
          created_at: string;
          feedback: number | null;
          id: number;
          updated_at: string | null;
          writer: string;
        };
        Insert: {
          answer?: number | null;
          comment: string;
          created_at?: string;
          feedback?: number | null;
          id?: number;
          updated_at?: string | null;
          writer: string;
        };
        Update: {
          answer?: number | null;
          comment?: string;
          created_at?: string;
          feedback?: number | null;
          id?: number;
          updated_at?: string | null;
          writer?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'feedback_comment_answer_fkey';
            columns: ['answer'];
            isOneToOne: false;
            referencedRelation: 'feedback_answer';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feedback_comment_feedback_fkey';
            columns: ['feedback'];
            isOneToOne: false;
            referencedRelation: 'feedback';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'feedback_comment_writer_fkey';
            columns: ['writer'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      tip: {
        Row: {
          content: string;
          created_at: string;
          explanation: string;
          id: number;
          thumbnail: string | null;
          title: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          explanation: string;
          id?: number;
          thumbnail?: string | null;
          title: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          explanation?: string;
          id?: number;
          thumbnail?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      topic: {
        Row: {
          created_at: string;
          id: number;
          image: string;
          num_a: number | null;
          num_b: number | null;
          title: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image: string;
          num_a?: number | null;
          num_b?: number | null;
          title: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string;
          num_a?: number | null;
          num_b?: number | null;
          title?: string;
        };
        Relationships: [];
      };
      topic_comment: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          like: string[] | null;
          recomment: number | null;
          topic: number;
          updated_at: string | null;
          user: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          like?: string[] | null;
          recomment?: number | null;
          topic: number;
          updated_at?: string | null;
          user: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          like?: string[] | null;
          recomment?: number | null;
          topic?: number;
          updated_at?: string | null;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'topic_comment_recomment_fkey';
            columns: ['recomment'];
            isOneToOne: false;
            referencedRelation: 'topic_comment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'topic_comment_topic_fkey';
            columns: ['topic'];
            isOneToOne: false;
            referencedRelation: 'topic';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'topic_comment_user_fkey';
            columns: ['user'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      topic_vote: {
        Row: {
          key: string;
          topic_id: number;
          user_id: string;
        };
        Insert: {
          key?: string;
          topic_id?: number;
          user_id: string;
        };
        Update: {
          key?: string;
          topic_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'topic_vote_topic_id_fkey';
            columns: ['topic_id'];
            isOneToOne: false;
            referencedRelation: 'topic';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'topic_vote_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          name: string | null;
          profile_image: string | null;
          school_grade: number | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id: string;
          name?: string | null;
          profile_image?: string | null;
          school_grade?: number | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string | null;
          profile_image?: string | null;
          school_grade?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
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

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
