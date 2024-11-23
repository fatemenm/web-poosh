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

import { Category, ClotheProduct } from "@/lib/definitions";
import styles from "@/styles/slider.module.css";

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
      <button className=" text-stone-800 ">
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
      <button className=" text-stone-800 ">
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

const settings = {
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

export default function AutoSlider({ data }: { data: ClotheProduct[] }) {
  const router = useRouter();
  return (
    <div className="w-full px-20 mx-auto mt-8 mb-24 ">
      <Slider {...settings}>
        {data.map((item) => (
          <div
            key={item.id}
            className="px-4 cursor-pointer outline-none "
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <Image
              src={apiBaseUrl + item.image.url}
              alt={item.image.alternativeText}
              width={item.image.width}
              height={item.image.height}
            />
            <div className="flex flex-col gap-2 text-center mt-4 text-stone-600 text-sm">
              <span className="font-medium">
                {item.name} {item.id.toLocaleString("fa-IR")}
              </span>
              <span>
                تومان{" "}
                {Number(item.price.replace(/,/g, "")).toLocaleString("fa-IR")}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
