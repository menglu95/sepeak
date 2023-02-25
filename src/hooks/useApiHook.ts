import { useState, useEffect } from 'react';
import { convertResponseToData, TNewsData } from '../common';
import guardian from 'guardian-js';
import { API_KEY } from '../constants';

export type TApiResponse = {
  statusText: string;
  startIndex: number;
  totalCount: number;
  pageSize: number;
  pages: number;
  currentPage: number;
  data: TNewsData[];
  error: any;
  loading: boolean;
};

export const useApiGet = (
  query: string,
  section: 'sport' | 'news' | 'lifeandstyle' | 'culture',
  n?: number,
  order?: 'newest' | 'oldest' | 'relevance',
): TApiResponse => {
  const [statusText, setStatusText] = useState<string>('');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState<TNewsData[]>([]);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const api = new guardian(API_KEY, false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      const apiResponse = await api.content.search(query, {
        section: section,
        pageSize: n ? n : 12,
        orderBy: order ? order : 'newest',
        showFields: 'headline,thumbnail,body,bodyText',
        showElements: 'all',
      });
      setStatusText(apiResponse.status);
      setStartIndex(apiResponse.startIndex);
      setTotalCount(apiResponse.total);
      setPageSize(apiResponse.pageSize);
      setPages(apiResponse.pages);
      setCurrentPage(apiResponse.currentPage);
      setData(apiResponse.results.map((item: any)=> convertResponseToData(item)));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, [query, order]);

  return { 
    statusText, 
    startIndex, 
    totalCount,
    pageSize,
    pages,
    currentPage, 
    data, 
    error, 
    loading 
  };
};