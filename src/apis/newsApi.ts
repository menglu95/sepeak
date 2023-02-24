import { useApiGet, TApiResponse } from '../hooks/useApiHook';
import { API_ENDPOINT, API_KEY } from '../constants';
import { TNewsData, convertResponseToData } from '../common';

const newsApi = {
  getData: (query: string, section: string, n?: number, order?: 'newest' | 'oldest') => {
    // const apiUri = `${API_ENDPOINT}&section=${section}&page-size=${n ? n : 15}&order-by=${order ? order : 'newest'}&api-key=${API_KEY}`;
    const data: TApiResponse = useApiGet(query, section, n, order);
    // let resultArr: TNewsData[] = [];
    // if (data.status === 200) {
    //   resultArr = data.data.response.results.map((item: any)=> convertResponseToData(item));
    // }
    return data;
  }
}

export { newsApi };
export default newsApi;