import {useApiGet, TApiResponse} from '../hooks/useApiHook';
import {API_ENDPOINT, API_KEY} from '../constants';
import {TNewsDataType, convertResponseToData} from '../common';

const defaultEndpoint = `${API_ENDPOINT}&section=sport`;

const sportNewsApi = {
  getDefaultAll: () => {
    const apiUri = `${defaultEndpoint}&api-key=${API_KEY}`;
    const data: TApiResponse = useApiGet(apiUri);
    let resultArr: TNewsDataType[] = [];
    if (data.status === 200) {
      resultArr = data.data.response.results.map((item: any)=> convertResponseToData(item));
    }
    return resultArr;
  },
  getLimit: (n: number) => {
    const apiUri = `${defaultEndpoint}&page-size=${n}&api-key=${API_KEY}`;
    const data: TApiResponse = useApiGet(apiUri);
    let resultArr: TNewsDataType[] = [];
    if (data.status === 200) {
      resultArr = data.data.response.results.map((item: any)=> convertResponseToData(item));
    }
    return resultArr;
  }
}

export { sportNewsApi };
export default sportNewsApi;