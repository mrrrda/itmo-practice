export const getReviews = async (page, limit) => {
  const response = await fetch(`${import.meta.env.VITE_REVIEWS_API_URL}?_page=${page}&_limit=${limit}`);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
  }

  const totalCount = response.headers.get('X-Total-Count');
  const data = await response.json();

  return { reviews: data, totalCount };
};

export const postReviews = async data => {
  const response = await fetch(`${import.meta.env.VITE_REVIEWS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error(`Failed to post reviews. Status: ${response.status}`);
  }
};

export const postOrders = async data => {
  const response = await fetch(`${import.meta.env.VITE_ORDERS_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error(`Failed to post orders. Status: ${response.status}`);
  }
};
