import { Allergy } from "./Allergy";

export interface Preference {
  diets: Diet[];
  allergies: Allergy[];
  blacklist: string[];
}

export interface Diet {
  name: string;
  description: string;
}
