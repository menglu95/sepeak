import { useState, useEffect } from 'react';
import { convertResponseToData, TNewsData } from '../common';
import guardian from 'guardian-js';
import { API_KEY } from '../constants';

export type TApiResponse = {
  statusText: string;
  data: TNewsData[];
  error: any;
  loading: boolean;
};

export const useApiGet = (query: string, section: string, n?: number, order?: 'newest' | 'oldest'): TApiResponse => {
  const [statusText, setStatusText] = useState<string>('');
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
      setData(apiResponse.results.map((item: any)=> convertResponseToData(item)));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return { statusText, data, error, loading };
};