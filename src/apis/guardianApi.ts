import { useState, useEffect } from 'react';
import guardian from 'guardian-js';
import { convertResponseToData, TNewsData } from '../common';
import { API_KEY } from '../constants';

const api = new guardian(API_KEY, false);

const guardianApi = {
  getData: async (query: string, section: string, n?: number, order?: 'newest' | 'oldest') => {
    let resultArr: TNewsData[] = [];
    api.content.search(query, {
      sections: section,
      pageSize: n ? n : 12,
      orderBy: order ? order : 'newest',
      showFields: 'headline,thumbnail,body,bodyText',
      showElements: 'all',
    })
    .then((res) => {
      resultArr = res.results.map((item: any)=> convertResponseToData(item));
      console.log('res', res);
      return resultArr;
    })
    .catch(error => console.log(error));
  }
}

export { guardianApi };
export default guardianApi;