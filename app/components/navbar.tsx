import Link from "next/link";

export default function Navbar({ style }: { style: any }) {
  return (
    <nav className={style}>
      <Link href="/">فروشگاه حضوری</Link>
      <Link href="/">تخفیف</Link>
      <Link href="/">اکسسوری</Link>
      <Link href="/">کفش</Link>
      <Link href="/">لباس</Link>
      <Link href="/">ست</Link>
      <Link href="/">جدیدترین ها</Link>
    </nav>
  );
}
