import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '@/helpers/api-handler';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  if (method === 'POST') {
    const response = await fetch(`${process.env.GAME_API_BASE_URL}/register`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const body = await response.json();
      console.info(`token: ${body.data.token}`);
      if (body && body.error) {
        return res.status(response.status).json(body.error);
      } else {
        return res.status(response.status).end(response.statusText);
      }
    }

    const { data } = await response.json();
    console.info(`token: ${data.token}`);
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
