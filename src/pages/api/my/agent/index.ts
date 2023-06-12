/* eslint-disable no-case-declarations */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'GET') {
    const response = await fetch(`${process.env.GAME_API_BASE_URL}/my/agent`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GAME_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      res.status(response.status).end(response.statusText);
    }

    const { data } = await response.json();
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
