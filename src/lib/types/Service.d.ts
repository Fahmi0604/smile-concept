declare type Service = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  content: string;
  videoUrl: string;
  beforeImgs: string[];
  afterImgs: string[];
  priceTable: {
    type: string;
    price: number;
  }[];
  cta: {
    title: string;
    description: string;
    textButton: string;
    url: string;
    imgBanner: string;
  };
  created_at: string;
  updated_at: string;
};
