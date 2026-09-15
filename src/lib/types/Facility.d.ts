declare type Facility = {
  id: number;
  slug: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  imageUrls: string[];
  isHighlighted: boolean;
  category: string;
  created_at: string;
  updated_at: string;
};

declare type FacilityResponse = Facility[];
