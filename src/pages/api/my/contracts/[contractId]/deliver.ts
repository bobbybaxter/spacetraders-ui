import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { contractId },
  } = req;

  await apiHandler({
    allowedMethods: ['POST'],
    body,
    method,
    res,
    url: `${process.env.GAME_API_BASE_URL}/my/contracts/${contractId}/deliver`,
  });
}
