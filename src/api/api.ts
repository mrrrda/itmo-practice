import { PostOrdersDTO, GetReviewsDTO, PostReviewsDTO } from './dto';
import { GetReviewsQueryParams } from './types';

export const getReviews = async (params: GetReviewsQueryParams): Promise<GetReviewsDTO> => {
  const response = await fetch(`${import.meta.env.VITE_REVIEWS_API_URL}?_page=${params.page}&_limit=${params.limit}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
  }

  const totalCount = response.headers.get('X-Total-Count');
  const data = await response.json();

  return { reviews: data, totalCount: Number(totalCount) };
};

export const postReviews = async (data: PostReviewsDTO) => {
  const response = await fetch(`${import.meta.env.VITE_REVIEWS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post reviews. Status: ${response.status}`);
  }
};

export const postOrders = async (data: PostOrdersDTO) => {
  const response = await fetch(`${import.meta.env.VITE_ORDERS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to post orders. Status: ${response.status}`);
  }
};
