import BannerGrid from "@/components/layout/home/BannerGrid";
import HeroBannerSection from "@/components/layout/home/HeroBannerSection";
import CategorySlider from "@/components/slider/CategorySlider";
import ProductsSlider from "@/components/slider/ProductsSlider";
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
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 500));
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
