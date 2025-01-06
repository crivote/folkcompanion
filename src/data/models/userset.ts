export interface userSet {
  id?: number;
  created_at?: number;
  user_id: number;
  tunes: { tunebook_id: number; notes: string; tunes_id: number }[];
  notes: string;
  title: string;
}
