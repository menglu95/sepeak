import React from 'react';

export type TNewsData = {
  id: string;
  type: string;
  webTitle: string;
  webUrl: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  headline: string;
  body: string;
  bodyText: string;
  thumbnail?: string;
};

export function convertResponseToData(res: any) {
  const result: TNewsData = {
    id: res.id,
    type: res.type,
    webTitle: res.webTitle,
    webUrl: res.webUrl,
    sectionId: res.sectionId,
    sectionName: res.sectionName,
    webPublicationDate: res.webPublicationDate,
    headline: res.fields.headline,
    body: res.fields.body,
    bodyText: res.fields.bodyText,
    thumbnail: res.fields.thumbnail
  }
  return result;
}