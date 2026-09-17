import { NEWS_API_BASE_URL, NEWS_API_KEY } from "@/config/api";
import { NewsApiResponse } from "@/types/news";

export interface FetchNewsParams {
    page?: number;
  pageSize?: number;
  category?: string;
  country?: string;
  query?: string;
}

export const fetchTopHeadlines = async(params:FetchNewsParams = {})=>{
     const {
    page = 1,
    pageSize = 20,
    category = 'general',
    country = 'us',
    query,
  } = params;



  if(!NEWS_API_KEY){
    return;
  }

 const queryParams = new URLSearchParams({
    apiKey: NEWS_API_KEY,
    page: page.toString(),
    pageSize: pageSize.toString(),
    country,
    ...(category && category !== 'all' && { category }),
    ...(query && { q: query }),
  });



  const url = `${NEWS_API_BASE_URL}/top-headlines?${queryParams.toString()}`;




  try {
    const response = await fetch(url);
    const data:NewsApiResponse = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'API returned an error');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return data;

  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }

}