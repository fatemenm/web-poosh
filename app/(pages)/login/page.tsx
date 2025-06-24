import AuthTabs from "@/features/auth/authTabs";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-max w-10/12 justify-center border-t py-10">
      <div className="mx-0 w-full rounded-sm border bg-white p-1 xs:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <AuthTabs />
      </div>
    </div>
  );
}
