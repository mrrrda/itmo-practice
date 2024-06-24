export type FileObjectType = {
  id: string;
  name: string;
  src: string;
};

export type RatingsType = {
  serviceQuality: number;
  productQuality: number;
  deliveryQuality: number;
};

export type BaseReviewsDTO = {
  id: string;
  name: string;
  email: string;
  review?: string;
  ratings: RatingsType;
  files?: FileObjectType[];
  date: string;
};

export type GetReviewsDTO = {
  reviews: BaseReviewsDTO[];
  totalCount: number | null;
};

export type PostReviewsDTO = Omit<BaseReviewsDTO, 'id'>;
