export interface userTune {
  id: number;
  created_at: number;
  tunes_id: number;
  user_id: number;
  prefered_name: string;
  preferred_img_url: string;
  prefered_tone: string;
  learned_date: string;
  status: string;
  status_num: number;
  rehearsal_days: number;
  last_rehearsals: number[];
  tags: string[];
  preferred_ABC: string;
  preferred_video: number;
  notes: string;
  mood: number[];
  last_status_change: number;
}
