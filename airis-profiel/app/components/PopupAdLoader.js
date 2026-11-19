import getData from "@/lib/blog";
import RandomPopupAd from "@/app/components/RandomPopupAd";

export default async function PopupAdLoader() {
  try {
    const result = await getData("ads");

    return (
      <RandomPopupAd
        ads={result?.data || []}
      />
    );
  } catch (error) {
    console.error("広告取得エラー:", error);
    return null;
  }
}