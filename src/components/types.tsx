export interface Person {
  name: string;
  occupation: string;
  birthdate: string;
  deathdate: string;
  description_brief: string | null;
  description_detail: string | null;
}

export interface PersonNearby {
  slug: string;
  img: string;
  occupation: string;
  birthdate: string | null;
  description: string;
  uploadBY: string;
}
