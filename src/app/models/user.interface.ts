export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    profilePicture?: string;
  
    role?: 'student' | 'prof' | 'admin' | 'profadmin'; 
  
    registeredUEs?: { code: string }[];     // UEs user is enrolled in
    submissions?: string[];       // Homework submissions
    posts?: string[];             // Forum posts authored
    comments?: string[];          // Forum comments authored
  
    loginHistory?: {
      date: Date;
      activityType: string;       // 'login', 'view-course', 'submit-homework', etc.
    }[];
  
    createdAt?: Date;
    updatedAt?: Date;
  }