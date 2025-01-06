export interface Tune {
  id: number;
  created_at: number;
  main_name: string;
  other_names: string[];
  type:
    | 'Double Jig'
    | 'Single Jig'
    | 'Reel'
    | 'March'
    | 'Hornpipe'
    | 'Slide'
    | 'Slip Jig'
    | 'Polka'
    | 'Mazurka'
    | 'Waltz'
    | 'Barndance'
    | 'Set Dance'
    | 'Other'
    | 'Three-Two';
  author: string;
  time: '2/4' | '3/4' | '4/4' | '6/8' | '9/8' | '12/8' | '3/2';
  tradition:
    | 'Ireland'
    | 'Scotland'
    | 'Breizh'
    | 'Cape Breton'
    | 'Irish American'
    | 'Galiza'[];
  References: Reference[];
  Modes_played: Mode[];
  Estructure: string;
  compasses: number;
  first_reference: FirstReference[];
  trivia: string;
  ABCsample: string;
  popularity: number;
  sortname: string;
}

interface Reference {
  service_name: 'thesession.org' | 'irishtune.info' | 'tunearch.org';
  service_ID: string;
}

interface Mode {
  Key: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  Mode: 'Major' | 'Minor' | 'Dorian' | 'Mixolydian';
}

interface FirstReference {
  year: number;
  source: string;
  type: 'printed' | 'record' | 'manuscript';
  link: string;
}
