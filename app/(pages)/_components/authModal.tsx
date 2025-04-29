import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Tabs from "@radix-ui/react-tabs";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { signIn, signUp } from "@/_lib/data";
import { Error as ErrorType } from "@/_lib/definitions";

type signInTypes = {
  email: string;
  password: string;
};

type signUpTypes = signInTypes & {
  isTermsAccepted: boolean;
};

export default function AuthModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("sign-up");
  const {
    register: registerSignIn,
    handleSubmit: handleSubmitSignIn,
    setError: setErrorSignIn,
    formState: { errors: errorsSignIn },
    reset: resetSignIn,
    clearErrors: clearErrorsSignIn,
  } = useForm<signInTypes>();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    setError: setErrorSignUp,
    formState: { errors: errorsSignUp },
    reset: resetSignUp,
    clearErrors: clearErrorsSignUp,
  } = useForm<signUpTypes>();

  const onSignIn: SubmitHandler<signInTypes> = async (data) => {
    try {
      const res = await signIn(data.email, data.password);
      localStorage.setItem("accessToken", res.jwt);
      console.log("signed in successfully:", res);
    } catch (error) {
      const e = error as ErrorType;
      setErrorSignIn("root", { message: e.message });
    }
  };
  const onSignUp: SubmitHandler<signUpTypes> = async (data) => {
    try {
      const res = await signUp(data.email, data.password);
      if (res.user) {
        console.log("signed up successfully", res);
        onSignIn(data);
      }
    } catch (error) {
      const e = error as ErrorType;
      setErrorSignUp("root", { message: e.message });
    }
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

  useEffect(() => {
    if (activeTab === "sign-in") resetSignIn();
    else resetSignUp();
    if (!isOpen) {
      resetSignIn();
      resetSignUp();
    }
  }, [activeTab, isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-stone-800 bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-28 w-[500px] -translate-x-1/2 rounded-sm bg-white p-2">
          <VisuallyHidden.Root asChild>
            <Dialog.Title> فرم ثبت نام و ورود کاریر </Dialog.Title>
          </VisuallyHidden.Root>
          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              نمایش فرم برای دریافت اطلاعات ورود یا ثبت نام کاربر
            </Dialog.Description>
          </VisuallyHidden.Root>
          <Dialog.Close className="absolute right-2 top-3 px-2 text-slate-500 hover:text-slate-600">
            <FontAwesomeIcon icon={faClose} className="text-[16px]" />
          </Dialog.Close>
          <Tabs.Root
            value={activeTab}
            onValueChange={setActiveTab}
            dir="rtl"
            className="my-10 flex flex-col px-6"
            defaultValue="sign-up"
          >
            <Tabs.List
              aria-label="مدیریت اکانت"
              className="mb-8 flex justify-stretch border-b border-b-stone-300"
            >
              <Tabs.Trigger
                value="sign-in"
                className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 data-[state=active]:border-b-stone-700"
              >
                ورود
              </Tabs.Trigger>
              <Tabs.Trigger
                value="sign-up"
                className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 data-[state=active]:border-b-stone-700"
              >
                ثبت نام
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              value="sign-up"
              className="flex flex-col gap-6 bg-white"
            >
              <p className="text-sm">
                اگر کاربر جدید هستید برای ثبت نام آدرس ایمیل و رمز عبور خود را
                مشخص کنید. در غیر این صورت{" "}
                <button
                  className="text-blue-500"
                  onClick={() => setActiveTab("ورود")}
                >
                  وارد
                </button>{" "}
                شوید
              </p>
              <Form.Root
                className="flex flex-col gap-6 px-6"
                onSubmit={handleSubmitSignUp(onSignUp)}
              >
                {/* root */}
                <Form.Field name="root">
                  <Form.Control asChild>
                    <div />
                  </Form.Control>
                  {errorsSignUp.root && (
                    <Form.Message className="text-sm text-stone-500">
                      {errorsSignUp.root.message}
                    </Form.Message>
                  )}
                </Form.Field>
                {/* email */}
                <Form.Field name="email" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      ایمیل
                    </Form.Label>
                    {errorsSignUp.email && (
                      <Form.Message className="text-sm text-stone-500">
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
                    <Form.Label className="text-sm text-stone-700">
                      رمز عبور
                    </Form.Label>
                    {errorsSignUp.password && (
                      <Form.Message className="text-sm text-stone-500">
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
                <Form.Field
                  name="isTermsAccepted"
                  className="flex flex-col gap-2"
                >
                  <div className="flex gap-2">
                    <Form.Control asChild>
                      <input
                        {...registerSignUp("isTermsAccepted", checkboxRule)}
                        type="checkbox"
                      />
                    </Form.Control>
                    <Form.Label className="border-b border-b-stone-600 text-sm text-stone-700">
                      <Link href="#">
                        قوانین و مقررات را مطالعه و پذیرفته ام
                      </Link>
                    </Form.Label>
                  </div>
                  {errorsSignUp.isTermsAccepted && (
                    <Form.Message className="text-sm text-stone-500">
                      {errorsSignUp.isTermsAccepted.message}
                    </Form.Message>
                  )}
                </Form.Field>
                <hr />
                <Form.Submit asChild>
                  <button className="mt-2 w-full bg-stone-800 px-2 py-4 text-center text-sm text-white">
                    ثبت نام
                  </button>
                </Form.Submit>
              </Form.Root>
            </Tabs.Content>
            <Tabs.Content
              value="sign-in"
              className="flex flex-col gap-6 bg-white"
            >
              <p className="text-sm">
                اگر قبلا در وب‌پوش ثبت ‌نام کرده‌اید وارد شوید در غیر این صورت{" "}
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
                className="flex flex-col gap-6 px-6"
                onSubmit={handleSubmitSignIn(onSignIn)}
              >
                {/* root */}
                <Form.Field name="root">
                  <Form.Control asChild>
                    <div />
                  </Form.Control>
                  {errorsSignIn.root && (
                    <Form.Message className="text-sm text-stone-500">
                      {errorsSignIn.root.message}
                    </Form.Message>
                  )}
                </Form.Field>
                {/* email */}
                <Form.Field name="email" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      ایمیل
                    </Form.Label>
                    {errorsSignIn.email && (
                      <Form.Message className="text-sm text-stone-500">
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
                    <Form.Label className="text-sm text-stone-700">
                      رمز عبور
                    </Form.Label>
                    {errorsSignIn.password && (
                      <Form.Message className="text-sm text-stone-500">
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
                  <Link href="" className="text-sm text-blue-500">
                    رمز عبور خود را فراموش کرده ام
                  </Link>
                </Form.Field>
                <hr />
                <Form.Submit asChild>
                  <button
                    type="submit"
                    className="mt-2 w-full bg-stone-800 px-2 py-4 text-center text-sm text-white"
                  >
                    ورود
                  </button>
                </Form.Submit>
              </Form.Root>
            </Tabs.Content>
          </Tabs.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
