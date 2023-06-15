import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { shipSymbol },
  } = req;

  await apiHandler({
    allowedMethods: ['POST'],
    method,
    res,
    url: `${process.env.GAME_API_BASE_URL}/my/ships/${shipSymbol}/dock`,
  });
}
