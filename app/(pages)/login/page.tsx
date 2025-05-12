"use client";

import AuthTabs from "../_components/authTabs";

export default function Page() {
  return (
    <div className="my-20 flex min-h-max justify-center">
      <div className="mx-0 basis-1/4 rounded-sm border bg-white p-2">
        <AuthTabs />
      </div>
    </div>
  );
}
