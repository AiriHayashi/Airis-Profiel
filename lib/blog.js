
const CMS_API_URL = process.env.CMS_API_URL;

export default async function getData(model) {
  const response = await fetch(
    `${CMS_API_URL}/${model}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("記事の取得に失敗しました");
  }

  const data = await response.json();

  return data.entries ?? data.items ?? data;
}
