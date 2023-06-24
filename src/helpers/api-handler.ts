import { NextApiResponse } from 'next';

export async function apiHandler({
  allowedMethods,
  body = undefined,
  method = 'GET',
  res,
  url,
}: {
  allowedMethods: string[];
  body?: object | undefined;
  method: string | undefined;
  res: NextApiResponse;
  url: string;
}) {
  if (allowedMethods.includes(method)) {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GAME_API_TOKEN}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const body = await response.json();
      if (body && body.error) {
        return res.status(response.status).json(body);
      } else {
        return res.status(response.status).end(response.statusText);
      }
    }

    if (response.status === 204) {
      return res.status(204).end();
    }

    const { data } = await response.json();
    return res.status(200).json(data);
  } else {
    res.setHeader('Allow', allowedMethods);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
