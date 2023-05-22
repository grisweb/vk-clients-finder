interface City {
  id: number;
  title: string;
  area?: string;
  region?: string;
}

interface University {
  id: number;
  title: string;
}

export type { City, University };
