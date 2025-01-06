// Define XanoAlbumRelation
export interface XanoAlbumRelation {
  recordings_id: number; // ID of the related recording
  track: number; // Track number in the album
  notes: string; // Notes regarding the album relation
}

// Define XanoTunesLink
export interface XanoTunesLink {
  id: number; // Unique identifier of the tune link
  created_at: string; // Timestamp indicating when the tune link was created
  tunes_id: number; // ID of the tune
  videos_id: number; // ID of the associated video
  timestart: number; // Start time in the video for the tune link
  timeend: number; // End time in the video for the tune link
  notes: string; // Notes for the tune link
}

// Define XanoVideo
export interface XanoVideo {
  id?: number; // Unique identifier of the video
  created_at?: string; // Timestamp indicating when the video was created
  url: string; // URL of the video
  thumb_url: string; // Thumbnail URL of the video
  type: string; // Type of the video (enum)
  Title: string; // Title of the video
  Performer: string; // Performer associated with the video
  notes: string; // Additional notes about the video
  album_relation?: XanoAlbumRelation; // Information about the album relation
  tuneslinks?: XanoTunesLink[]; // List of tunes links related to the video
}
