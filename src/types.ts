export interface Launch {
    name: string;
    date_utc: string;
    success: boolean;
    details?: string;
    rocket: string;
    links: {
      patch: {
        small: string | null;
        large: string | null;
      };
    };
  }
  
  export interface Rocket {
    name: string;
    type: string;
    description: string;
    first_flight: string;
    stages: number;
    boosters: number;
  }
  