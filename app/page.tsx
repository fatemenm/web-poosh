import Carousel from "./ui/carousel ";
import { getImages } from "./lib/images";
import path from "path";

export default async function Page() {
  const categoryImages = await getImages("category");
  return (
    <div className="px-10 pt-10">
      <Carousel images={categoryImages} imageType="category" />
    </div>
  );
}
