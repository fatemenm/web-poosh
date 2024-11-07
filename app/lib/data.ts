import { Banner, HeroBanner, NavbarItem, responseBody } from "./definitions";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const urls = {
  getBanners: new URL("/api/banners", baseUrl),
  getNavbarItems: new URL("/api/navbar-items", baseUrl),
  getHeroBanners: new URL("/api/hero-banners", baseUrl),
};

export async function getBannerData() {
  try {
    const response = await fetch(urls.getBanners.href);
    const body: responseBody = await response.json();
    const data = body.data.map((item) => ({
      ...item,
      startDate: new Date(item.startDate as string),
      endDate: new Date(item.endDate as string),
    })) as Banner[];
    const now: Date = new Date();
    const earliestActiveBanner = data
      .filter((banner) => {
        return banner.startDate < now && banner.endDate > now && banner;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .pop();
    return earliestActiveBanner;
  } catch (error) {
    console.log(error);
  }
}
export async function getNavbarItems() {
  try {
    urls.getNavbarItems.searchParams.append("sort", "order:desc");
    urls.getNavbarItems.searchParams.append("populate", "image");
    const response = await fetch(urls.getNavbarItems.href);
    const body: responseBody = await response.json();
    const data = body.data as NavbarItem[];
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getHeroBanners() {
  try {
    urls.getHeroBanners.searchParams.append("populate", "image");
    const response = await fetch(urls.getHeroBanners.href);
    const body: responseBody = await response.json();
    const data = body.data as HeroBanner[];
    return data;
  } catch (error) {
    console.log(error);
  }
}
