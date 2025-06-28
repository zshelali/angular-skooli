export interface Ue {
    _id?: string;
    code: string;                 // e.g., "IT41"
    name: string;
    description?: string;
    credits?: number;
    illustration?: string;        // image URL or file reference
    lastUpdateDate?: Date;

    students?: string[];          // user IDs enrolled
    teachers?: string[];          // user IDs teaching this UE

    courses?: string[];           // Course (content) IDs
    assignments?: string[];       // Homework IDs
    posts?: string[];             // Forum post IDs
    announcements?: string[];     // Announcement IDs

    createdAt?: Date;
    updatedAt?: Date;
  }
