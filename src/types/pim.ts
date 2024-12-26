import { ProductBase } from './product';

export type ProductStatus = 'draft' | 'active' | 'discontinued' | 'archived';
export type AttributeType = 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'color' | 'date';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description?: string;
  image?: string;
  order: number;
  isActive: boolean;
  attributes: string[]; // Array of attribute IDs
  createdAt: string;
  updatedAt: string;
}

export interface Attribute {
  id: string;
  name: string;
  code: string;
  type: AttributeType;
  required: boolean;
  options?: string[]; // For select/multiselect types
  unit?: string; // For number types
  defaultValue?: string;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductAttribute {
  attributeId: string;
  value: string | number | boolean | string[];
}

export interface PIMProduct extends ProductBase {
  status: ProductStatus;
  categoryIds: string[];
  attributes: ProductAttribute[];
  relatedProducts: string[];
  searchKeywords: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}