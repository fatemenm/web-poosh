import * as Form from "@radix-ui/react-form";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/lib/context/authContext";
import { Error as ErrorType } from "@/lib/definitions";

type SignInTypes = {
  email: string;
  password: string;
};

type SignUpTypes = SignInTypes & {
  isTermsAccepted: boolean;
};

const emailRules = {
  required: "لطفا ایمیل خود را وارد کنید",
  pattern: {
    value: /^\S+@\S+$/,
    message: "لطفا آدرس ایمیل معتبر وارد کنید",
  },
};
const passwordRules = {
  required: "لطفا رمز عبور خود را وارد کنید",
  minLength: {
    value: 6,
    message: "رمز عبور باید دارای حداقل ۶ کاراکتر باشد",
  },
};
const checkboxRule = {
  required: "لطفاً شرایط و قوانین را بپذیرید.",
};

export default function AuthTabs() {
  const { handleSignIn, handleSignUp } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("sign-in");
  const router = useRouter();
  const pathname = usePathname();
  const { closeAuthModal } = useAuth();

  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    setError: setErrorSignIn,
    formState: { errors: errorsSignIn },
    reset: resetSignIn,
    clearErrors: clearErrorsSignIn,
  } = useForm<SignInTypes>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    setError: setErrorSignUp,
    formState: { errors: errorsSignUp },
    reset: resetSignUp,
    clearErrors: clearErrorsSignUp,
  } = useForm<SignUpTypes>();
  const onSignIn: SubmitHandler<SignInTypes> = async (data) => {
    try {
      await handleSignIn(data.email, data.password);
      resetSignIn();
      if (closeAuthModal) closeAuthModal();
      if (pathname.includes("/login")) router.replace("/");
    } catch (error) {
      const e = error as ErrorType;
      setErrorSignIn("root", { message: e.message });
    }
  };
  const onSignUp: SubmitHandler<SignUpTypes> = async (data) => {
    try {
      await handleSignUp(data.email, data.password);
      resetSignUp();
      if (closeAuthModal) closeAuthModal();
      if (pathname.includes("/login")) router.replace("/");
    } catch (error) {
      const e = error as ErrorType;
      setErrorSignUp("root", { message: e.message });
    }
  };

  useEffect(() => {
    if (activeTab === "sign-in") resetSignIn();
    else resetSignUp();
  }, [activeTab, resetSignIn, resetSignUp]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      dir="rtl"
      className="my-6 flex flex-col px-6 xs:my-10"
      defaultValue="sign-up"
    >
      <Tabs.List
        aria-label="مدیریت اکانت"
        className="mb-8 flex justify-stretch border-b border-b-stone-300"
      >
        <Tabs.Trigger
          value="sign-in"
          className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 text-sm data-[state=active]:border-b-stone-700 sm:text-base"
        >
          ورود
        </Tabs.Trigger>
        <Tabs.Trigger
          value="sign-up"
          className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 text-sm data-[state=active]:border-b-stone-700 sm:text-base"
        >
          ثبت نام
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="sign-up" className="flex flex-col bg-white xs:gap-6">
        <p className="text-xs md:text-sm">
          اگر کاربر جدید هستید برای ثبت نام آدرس ایمیل و رمز عبور خود را مشخص
          کنید. در غیر این صورت{" "}
          <button
            className="text-blue-500"
            onClick={() => setActiveTab("sign-in")}
          >
            وارد
          </button>{" "}
          شوید
        </p>
        <Form.Root
          className="flex flex-col gap-3 px-0 xs:gap-6 xs:px-6"
          onSubmit={handleSubmitSignUp(onSignUp)}
        >
          {/* root */}
          <Form.Field name="root">
            <Form.Control asChild>
              <div />
            </Form.Control>
            {errorsSignUp.root && (
              <Form.Message className="text-xs text-stone-500 md:text-sm">
                {errorsSignUp.root.message}
              </Form.Message>
            )}
          </Form.Field>
          {/* email */}
          <Form.Field name="email" className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-xs text-stone-700 md:text-sm">
                ایمیل
              </Form.Label>
              {errorsSignUp.email && (
                <Form.Message className="text-xs text-stone-500 md:text-sm">
                  {errorsSignUp.email.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...registerSignUp("email", emailRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="email"
                onClick={() => clearErrorsSignUp("root")}
              />
            </Form.Control>
          </Form.Field>
          {/* password */}
          <Form.Field name="password" className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-xs text-stone-700 md:text-sm">
                رمز عبور
              </Form.Label>
              {errorsSignUp.password && (
                <Form.Message className="text-xs text-stone-500 md:text-sm">
                  {errorsSignUp.password.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...registerSignUp("password", passwordRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="password"
                onClick={() => clearErrorsSignUp("root")}
              />
            </Form.Control>
          </Form.Field>
          {/* terms checkbox */}
          <Form.Field name="isTermsAccepted" className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Form.Control asChild>
                <input
                  {...registerSignUp("isTermsAccepted", checkboxRule)}
                  type="checkbox"
                />
              </Form.Control>
              <Form.Label className="border-b border-b-stone-600 text-xs text-stone-700 md:text-sm">
                <Link href="#">قوانین و مقررات را مطالعه و پذیرفته ام</Link>
              </Form.Label>
            </div>
            {errorsSignUp.isTermsAccepted && (
              <Form.Message className="text-xs text-stone-500 md:text-sm">
                {errorsSignUp.isTermsAccepted.message}
              </Form.Message>
            )}
          </Form.Field>
          <hr />
          <Form.Submit asChild>
            <button className="mt-2 w-full bg-stone-800 px-2 py-4 text-center text-xs text-white md:text-sm">
              ثبت نام
            </button>
          </Form.Submit>
        </Form.Root>
      </Tabs.Content>
      <Tabs.Content value="sign-in" className="flex flex-col bg-white xs:gap-6">
        <p className="text-xs md:text-sm">
          اگر قبلا در کایزن ثبت ‌نام کرده‌اید وارد شوید در غیر این صورت{" "}
          <button
            className="text-blue-500"
            onClick={() => setActiveTab("sign-up")}
          >
            ثبت‌ نام
          </button>{" "}
          کنید
        </p>
        <Form.Root
          noValidate
          className="flex flex-col gap-3 px-0 xs:gap-6 xs:px-6"
          onSubmit={handleSubmitSignIn(onSignIn)}
        >
          {/* root */}
          <Form.Field name="root">
            <Form.Control asChild>
              <div />
            </Form.Control>
            {errorsSignIn.root && (
              <Form.Message className="text-xs text-stone-500 md:text-sm">
                {errorsSignIn.root.message}
              </Form.Message>
            )}
          </Form.Field>
          {/* email */}
          <Form.Field name="email" className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-xs text-stone-700 md:text-sm">
                ایمیل
              </Form.Label>
              {errorsSignIn.email && (
                <Form.Message className="text-xs text-stone-500 md:text-sm">
                  {errorsSignIn.email.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...registerSignIn("email", emailRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="email"
                onClick={() => clearErrorsSignIn("root")}
              />
            </Form.Control>
          </Form.Field>
          {/* password */}
          <Form.Field name="password" className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-xs text-stone-700 md:text-sm">
                رمز عبور
              </Form.Label>
              {errorsSignIn.password && (
                <Form.Message className="text-xs text-stone-500 md:text-sm">
                  {errorsSignIn.password.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                {...registerSignIn("password", passwordRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="password"
                onClick={() => clearErrorsSignIn("root")}
              />
            </Form.Control>
            {/* <Link href="" className="text-xs md:text-sm text-blue-500">
                رمز عبور خود را فراموش کرده ام
              </Link> */}
          </Form.Field>
          <hr />
          <Form.Submit asChild>
            <button
              type="submit"
              className="mt-2 w-full bg-stone-800 px-2 py-4 text-center text-xs text-white md:text-sm"
            >
              ورود
            </button>
          </Form.Submit>
        </Form.Root>
      </Tabs.Content>
    </Tabs.Root>
  );
}
