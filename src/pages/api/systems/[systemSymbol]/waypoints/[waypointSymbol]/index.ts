import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { systemSymbol, waypointSymbol },
  } = req;

  await apiHandler({
    allowedMethods: ['GET'],
    method,
    res,
    url: `${process.env.GAME_API_BASE_URL}/systems/${systemSymbol}/waypoints/${waypointSymbol}`,
  });
}
