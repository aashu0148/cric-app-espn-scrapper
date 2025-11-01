export interface PlayerData {
  name: string;
  id: string;
  slug: string;
  objectId: string;
  country: string;
  image: string | null;
  espnUrl: string;
  stats: StatSection[];
  information: Record<string, string>;
  full_name: string;
  playingRole: string;
  battingStyle: string;
  bowlingStyle: string;
}

export interface StatSection {
  heading: string;
  data: Record<string, string>[];
}

export interface ScrapeResponse {
  success: boolean;
  data?: PlayerData;
  error?: string;
}



