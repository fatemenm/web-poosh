"use client";

import { apiBaseUrl } from "@config";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ClotheProduct } from "@/lib/definitions";
import styles from "@/styles/homeSlider.module.css";

interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
}

function LeftArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow} ${styles.customLeftArrow}`}
      onClick={onClick}
      style={style}
    >
      <button className="text-stone-800">
        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

function RightArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow} ${styles.customRightArrow}`}
      onClick={onClick}
      style={style}
    >
      <button className="text-stone-800">
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

const sliderSettings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 400,
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: "linear",
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
};

export default function NewProductsSlider({ data }: { data: ClotheProduct[] }) {
  const router = useRouter();
  return (
    <div className="mx-auto mb-24 mt-8 w-full px-20">
      <Slider {...sliderSettings}>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="cursor-pointer px-4 outline-none"
              onClick={() => router.push(`/products/${item.documentId}`)}
            >
              <Image
                src={apiBaseUrl + item.images[0].url}
                alt={item.images[0].alternativeText}
                width={item.images[0].width}
                height={item.images[0].height}
              />
              <div className="mt-4 flex flex-col gap-2 text-center text-sm text-stone-600">
                <span className="font-medium">
                  {item.id.toLocaleString("fa-IR")} {item.name}
                </span>
                <span>
                  تومان{" "}
                  {Number(item.price.replace(/,/g, "")).toLocaleString("fa-IR")}
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
