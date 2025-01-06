export interface User {
  id: number; // The unique identifier for the user
  created_at?: number; // The timestamp of when the user was created
  name: string; // The name of the user
  email: string; // The email of the user
  password?: string; // The password of the user
  google_oauth?: {
    id: string; // The Google ID for OAuth
    name: string; // The name associated with the Google account
    email: string; // The email associated with the Google account
  };
  role: 'admin' | 'user' | 'guest'; // The role of the user
  avatar?: {
    url: string; // The URL to access the avatar
  };
  lang: string; // The language preference of the user
  config: Record<string, unknown>; // Configuration in JSON format
  last_login: string; // the timestamp of last login
}
