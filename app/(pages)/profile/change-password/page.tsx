"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Form from "@radix-ui/react-form";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "@/_lib/context/authContext";
import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";
import { Error as ErrorType } from "@/_lib/definitions";

type Inputs = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

export default function Page() {
  const { handleChangePassword } = useAuth();
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const timerRef = useRef(0);
  const {
    register,
    watch,
    setError,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const [currentPassword, newPassword] = watch([
    "currentPassword",
    "newPassword",
  ]);

  function showSuccessToast() {
    setIsToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsToastOpen(true);
    }, 100);
  }

  const onChangePassword: SubmitHandler<Inputs> = async ({
    currentPassword,
    newPassword,
    passwordConfirmation,
  }) => {
    try {
      await handleChangePassword(
        currentPassword,
        newPassword,
        passwordConfirmation
      );
      reset();
      showSuccessToast();
    } catch (error) {
      const e = error as ErrorType;
      console.log("error in the change pass page:", e);
      setError("root", { message: e.message });
    }
  };

  const currentPasswordRules = {
    required: "لطفا رمز عبور خود را وارد کنید",
    minLength: {
      value: 6,
      message: "رمز عبور باید دارای حداقل ۶ کاراکتر باشد",
    },
  };

  const newPasswordRules = {
    required: "لطفا رمز عبور جدید را وارد کنید",
    minLength: {
      value: 6,
      message: "رمز عبور باید دارای حداقل ۶ کاراکتر باشد",
    },
    validate: (value: string) =>
      value !== currentPassword ||
      "رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد",
  };

  const passwordConfirmationRules = {
    required: "لطفا تکرار رمز عبور جدید را وارد کنید",
    minLength: {
      value: 6,
      message: "رمز عبور باید دارای حداقل ۶ کاراکتر باشد",
    },
    validate: (value: string) =>
      value === newPassword || "رمز عبور و تکرار آن یکسان نیستند",
  };

  const breadCrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    { label: "پروفایل", href: "/profile" },
    {
      label: "تغییر رمز عبور",
      href: "/change-password",
    },
  ];

  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(breadCrumbItems);
  }, [setItems]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      <p className="border-b-2 border-b-stone-700 pb-4 md:max-w-60 md:text-2xl">
        تغییر رمز عبور
      </p>
      <Form.Root
        className="flex w-full flex-col gap-8 self-center px-4 md:w-2/3 md:px-0 xl:w-1/3"
        onSubmit={handleSubmit(onChangePassword)}
      >
        <div className="flex flex-col gap-6">
          <Form.Field name="root">
            <Form.Control asChild>
              <div />
            </Form.Control>
            {errors.root && (
              <Form.Message className="text-sm text-stone-500">
                {errors.root.message}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Field
            name="currentPassword"
            className="flex flex-col gap-2 md:w-auto"
          >
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm text-stone-700">
                رمز عبور فعلی
              </Form.Label>
              {errors.currentPassword && (
                <Form.Message className="text-sm text-stone-500">
                  {errors.currentPassword.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                onClick={() => clearErrors("root")}
                {...register("currentPassword", currentPasswordRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="password"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field name="newPassword" className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm text-stone-700">
                رمز جدید
              </Form.Label>
              {errors.newPassword && (
                <Form.Message className="text-sm text-stone-500">
                  {errors.newPassword.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                onClick={() => clearErrors("root")}
                {...register("newPassword", newPasswordRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="password"
              />
            </Form.Control>
          </Form.Field>
          <Form.Field
            name="passwordConfirmation"
            className="flex flex-col gap-2"
          >
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm text-stone-700">
                تکرار رمز جدید
              </Form.Label>
              {errors.passwordConfirmation && (
                <Form.Message className="text-sm text-stone-500">
                  {errors.passwordConfirmation.message}
                </Form.Message>
              )}
            </div>
            <Form.Control asChild>
              <input
                onClick={() => clearErrors("root")}
                {...register("passwordConfirmation", passwordConfirmationRules)}
                className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                type="password"
              />
            </Form.Control>
          </Form.Field>
        </div>
        <Form.Submit asChild>
          <button className="w-full bg-stone-800 py-4 text-sm text-white">
            تغییر رمز عبور
          </button>
        </Form.Submit>
      </Form.Root>
      <Toast.Root
        duration={3000}
        dir="rtl"
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        className="flex items-center justify-between gap-1 rounded-md border bg-green-100 p-4 data-[state=closed]:animate-hide data-[state=open]:animate-slideIn"
      >
        <Toast.Description className="">
          رمز عبور با موفقیت تغییر یافت
        </Toast.Description>
        <Toast.Close asChild className="text-stone-500 hover:text-stone-600">
          <FontAwesomeIcon icon={faClose} className="text-[16px]" />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:25px]" />
    </div>
  );
}
