"use client";

import AuthTabs from "../_components/authTabs";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-max w-10/12 justify-center border-t py-10">
      <div className="mx-0 basis-1/3 rounded-sm border bg-white p-2">
        <AuthTabs />
      </div>
    </div>
  );
}
