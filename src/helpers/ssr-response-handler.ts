export async function ssrResponseHandler(res: Response) {
  if (res.status !== 200) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}
