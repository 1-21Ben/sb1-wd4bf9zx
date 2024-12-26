export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: SubCategory[];
}