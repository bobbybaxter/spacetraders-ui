interface ErrorWithInfo extends Error {
  info: any;
  status: number;
}

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');

    // Attach extra info to the error object.
    const errorWithInfo: ErrorWithInfo = {
      ...error,
      info: await res.json(),
      status: res.status,
    };

    throw errorWithInfo;
  }

  return res.json();
}
