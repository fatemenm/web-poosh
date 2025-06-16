import BreadcrumbWrapper from "@/components/layout/breadcrumbWrapper";

import ProfileNavbar from "./ProfileNavbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 sm:gap-10 lg:w-11/12 xl:w-10/12">
      <BreadcrumbWrapper />
      <div className="mb-10 flex flex-col gap-10 sm:flex-row sm:items-stretch sm:gap-0">
        <ProfileNavbar />
        <div className="w-full grow sm:w-auto sm:px-20">{children}</div>
      </div>
    </div>
  );
}
