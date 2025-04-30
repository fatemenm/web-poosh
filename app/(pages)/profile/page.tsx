"use client";

import { useAuth } from "@/_lib/context/authContext";

export default function Page() {
  const { user } = useAuth();
  return (
    <div className="grow bg-rose-50 px-20">
      <h2>Profile details</h2>
      <p>{user?.username}</p>
    </div>
  );
}
