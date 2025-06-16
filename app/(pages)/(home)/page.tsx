import BannerGrid from "@/(pages)/(home)/components/BannerGrid";
import CategorySlider from "@/(pages)/(home)/components/CategorySlider";
import HeroBannerSection from "@/(pages)/(home)/components/HeroBannerSection";
import ProductsSlider from "@/(pages)/(home)/components/ProductsSlider";
import {
  getCategories,
  getClotheSetBanners,
  getHeroBanners,
  getProducts,
} from "@/lib/data";

async function getData() {
  const [heroBanners, categories, clothingSetBanners, products] =
    await Promise.all([
      getHeroBanners(),
      getCategories(),
      getClotheSetBanners(),
      (await getProducts()).products,
    ]);
  return { heroBanners, categories, clothingSetBanners, products };
}

export default async function Page() {
  const { heroBanners, categories, clothingSetBanners, products } =
    await getData();
  return (
    <div className="flex w-full flex-col lg:w-11/12 xl:w-10/12">
      <HeroBannerSection banners={heroBanners} />
      <CategorySlider categories={categories} />
      <BannerGrid banners={clothingSetBanners} />
      <ProductsSlider
        sliderTitle="محصولات جدید"
        products={products.map((p) => p.data)}
      />
    </div>
  );
}
