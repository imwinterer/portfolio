import { createClient } from 'microcms-js-sdk';

import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSDate,
  MicroCMSContentId,
  MicroCMSListResponse
} from 'microcms-js-sdk';

import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
  slug: string;
} & MicroCMSContentId &
  MicroCMSDate;


// カテゴリの型定義
export type Category = {
  name: string;
  slug: string;
} & MicroCMSContentId &
  MicroCMSDate;


// 実績の型定義
export type Works = {
  eyecatch?: MicroCMSImage;
  title: string;
  url: string;
  category?: Category;
  tag?: Tag[];
  date?: string;
  content: string;
};


// 記事の型定義
export type Article = Works & MicroCMSContentId & MicroCMSDate;


export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});


export const getAllContents = async(queries: MicroCMSQueries): Promise<MicroCMSListResponse<Works>> => {
  const listData = await client
    .getList<Works>({
      endpoint: 'works',
      queries,
    })
    .catch((err) => console.error(err));

  if (!listData) {
    return { contents: [], totalCount: 0, offset: 0, limit: 0 };
  }

  if (listData.offset + listData.limit < listData.totalCount) {
    const additionalContents = await getAllContents({
      ...queries,
      offset: listData.offset + listData.limit,
    });
    return {
      ...listData,
      contents: [...listData.contents, ...additionalContents.contents],
    };
  }

  return listData;
};


export const getDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const detailData = await client
    .getListDetail<Works>({
      endpoint: 'works',
      contentId,
      queries,
    })
    .catch(notFound);

  return detailData;
};
