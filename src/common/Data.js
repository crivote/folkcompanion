/**
 * objeto de datos globales
 */

export const Data = {
  // data templates
  template: {
    tunebook: {
      tunes_id: 0,
      user_id: 0,
      preferred_img_url: '',
      prefered_name: '',
      prefered_tone: '',
      status: '',
      learned_date: '',
      rehearsal_days: 0,
      last_rehearsals: [],
      status_num: 0,
    },
    set: {
      user_id: 0,
      tunes: [],
      title: '',
      notes: '',
    },
    suggestion: {
      type_of_suggestion: '',
      user_id: 0,
      content: '',
      status: '',
      notes: '',
    },
  },
  // user data
  user: '',
  tunes: [],
  // tunes in user tunebook
  tunebook: [],
  // sets in user setbook
  setbook: [],
  // all videos from back
  videos: [],
  // some pics to add
  genericpics: [],
  // status para temas por defecto
  status: [
    { value: 1, factor: 0, label: 'Pendiente', color: 'stone-600' },
    {
      value: 2,
      factor: 2,
      label: 'Aprendiendo',
      color: 'orange-600',
      times: 7,
      days: 10,
    },
    { value: 3, factor: 2, label: 'Fijar', color: 'yellow-500', days: 15 },
    { value: 4, factor: 1, label: 'Básica', color: 'lime-500', days: 30 },
    {
      value: 5,
      factor: 0.5,
      label: 'Intermedio',
      color: 'green-600',
      days: 45,
    },
    {
      value: 6,
      factor: 0.25,
      label: 'Avanzada',
      color: 'emerald-600',
      days: 60,
    },
    { value: 7, factor: 0.1, label: 'Maestro', color: 'emerald-900', days: 60 },
  ],
  rythms: {
    'Double Jig': '6/8',
    'Single Jig': '6/8',
    Reel: '4/4',
    March: '4/4',
    Hornpipe: '4/4',
    Slide: '12/8',
    'Slip Jig': '9/8',
    Polka: '2/4',
    Mazurka: '4/4',
    Waltz: '3/4',
  },
  videotypes: [
    'album',
    'live event',
    'tv record',
    'home record',
    'learning',
    'others',
  ],
  tones: {
    A: 'la',
    B: 'si',
    C: 'do',
    D: 're',
    E: 'mi',
    F: 'fa',
    G: 'sol',
  },
  keyAlterations: {
    'C maj': 0,
    'A min': 0,
    'G maj': 1,
    'E min': 1,
    'D maj': 2,
    'B min': 2,
    'A maj': 3,
    'F# min': 3,
    'E maj': 4,
    'C# min': 4,
    'B maj': 5,
    'G# min': 5,
    'F# maj': 6,
    'D# min': 6,
    'C# maj': 7,
    'A# min': 7,
    'F maj': -1,
    'D min': -1,
    'Bb maj': -2,
    'G min': -2,
    'Eb maj': -3,
    'C min': -3,
    'Ab maj': -4,
    'F min': -4,
    'Db maj': -5,
    'Bb min': -5,
    'Gb maj': -6,
    'Eb min': -6,
    'Cb maj': -7,
    'Ab min': -7,

    // Modos dórico (basados en la tónica mayor correspondiente)
    'D dor': -1,
    'E dor': 2,
    'F dor': -4,
    'G dor': 1,
    'A dor': 3,
    'B dor': 5,
    'C dor': 0,

    // Modos mixolidio (basados en la tónica mayor correspondiente)
    'C mix': 0,
    'D mix': 1,
    'E mix': 4,
    'F mix': -1,
    'G mix': 1,
    'A mix': 2,
    'B mix': 5,
  },
};
