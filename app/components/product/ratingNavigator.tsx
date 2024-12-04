import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function RatingNavigator({
  starRatingNumber,
  targetId,
}: {
  starRatingNumber: number;
  targetId: string;
}) {
  return (
    <div className="flex flex-row items-center gap-2 stroke-stone-700 text-xs font-light">
      <div>
        {Array(starRatingNumber)
          .fill(1)
          .map((value, index) => {
            return (
              <span key={index}>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ fontSize: 20, color: "lightgray" }}
                />
              </span>
            );
          })}
      </div>
      <Link href={`#${targetId}`} className="text-stone-800">
        اولین نظر را بنویسید
      </Link>
    </div>
  );
}
