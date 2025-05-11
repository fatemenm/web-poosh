"use client";

import * as Form from "@radix-ui/react-form";
import * as Tabs from "@radix-ui/react-tabs";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/_lib/context/authContext";

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("sign-in");
  const { handleSignIn, handleSignUp } = useAuth();
  return (
    <div>
      <h1 className="p-10 text-lg">this is authModal</h1>
      <br />
    </div>
  );
}
