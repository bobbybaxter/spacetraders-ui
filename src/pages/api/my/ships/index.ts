import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let url = `${process.env.GAME_API_BASE_URL}/my/ships`;
  const { body, method, query } = req;

  if (!_.isEmpty(query)) {
    const params = new URLSearchParams(query as Record<string, string>);
    url = `${url}?${params}`;
  }

  await apiHandler({
    allowedMethods: ['GET', 'POST'],
    body,
    method,
    res,
    url,
  });
}
