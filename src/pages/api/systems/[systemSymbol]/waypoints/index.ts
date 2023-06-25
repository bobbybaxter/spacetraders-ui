import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

interface QueryParams {
  [key: string]: string | string[] | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;
  let url = `${process.env.GAME_API_BASE_URL}/systems/${query.systemSymbol}/waypoints`;

  const filteredQueries = Object.entries(query).filter(([key]) => {
    return key !== 'systemSymbol';
  });
  const queryParams = Object.fromEntries(filteredQueries);

  if (!_.isEmpty(queryParams)) {
    const params = new URLSearchParams(queryParams as Record<string, string>);
    url = `${url}?${params}`;
  }

  await apiHandler({
    allowedMethods: ['GET'],
    method,
    res,
    url,
  });
}
