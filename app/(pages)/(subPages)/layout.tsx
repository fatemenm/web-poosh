import BreadCrumb from "@/components/breadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-48 flex flex-col gap-16">
      <BreadCrumb />
      {children}
    </div>
  );
}
