import BreadCrumb from "@/components/breadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-16">
      <BreadCrumb />
      {children}
    </div>
  );
}
