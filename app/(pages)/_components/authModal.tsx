import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as Form from "@radix-ui/react-form";
import * as Tabs from "@radix-ui/react-tabs";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export default function AuthModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("ثبت نام");
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
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
            defaultValue="ثبت نام"
          >
            <Tabs.List
              aria-label="مدیریت اکانت"
              className="mb-8 flex justify-stretch border-b border-b-stone-300"
            >
              <Tabs.Trigger
                value="ورود"
                className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 data-[state=active]:border-b-stone-700"
              >
                ورود
              </Tabs.Trigger>
              <Tabs.Trigger
                value="ثبت نام"
                className="flex basis-1/2 justify-center border-b-2 border-b-transparent bg-white p-2 data-[state=active]:border-b-stone-700"
              >
                ثبت نام
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              value="ثبت نام"
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
              <Form.Root className="flex flex-col gap-6 px-6">
                {/* email */}
                <Form.Field name="email" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      ایمیل
                    </Form.Label>
                    <Form.Message
                      className="text-[13px] opacity-80"
                      match="valueMissing"
                    >
                      لطفا ایمیل خود را وارد کنید
                    </Form.Message>
                    <Form.Message
                      className="text-[13px] opacity-80"
                      match="typeMismatch"
                    >
                      لطفا آدرس ایمیل معتبر وارد کنید
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                      type="email"
                      required
                    />
                  </Form.Control>
                </Form.Field>
                {/* password */}
                <Form.Field name="password" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      رمز عبور
                    </Form.Label>
                    <Form.Message
                      className="text-[13px] opacity-80"
                      match="valueMissing"
                    >
                      لطفا رمز عبور خود را وارد کنید
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                      type="password"
                      required
                    />
                  </Form.Control>
                </Form.Field>
                {/* terms checkbox */}
                <Form.Field name="terms" className="flex gap-2">
                  <Form.Control asChild>
                    <input type="checkbox" required />
                  </Form.Control>
                  <Form.Label className="border-b border-b-stone-600 text-sm text-stone-700">
                    <Link href="/">قوانین و مقررات را مطالعه و پذیرفته ام</Link>
                  </Form.Label>
                </Form.Field>
                <hr />
                <Form.Submit asChild>
                  <button className="mt-2 w-full bg-stone-800 px-2 py-4 text-center text-sm text-white">
                    ثبت نام
                  </button>
                </Form.Submit>
              </Form.Root>
            </Tabs.Content>
            <Tabs.Content value="ورود" className="flex flex-col gap-6 bg-white">
              <p className="text-sm">
                اگر قبلا در وب‌پوش ثبت ‌نام کرده‌اید وارد شوید در غیر این صورت{" "}
                <button
                  className="text-blue-500"
                  onClick={() => setActiveTab("ثبت نام")}
                >
                  ثبت‌ نام
                </button>{" "}
                کنید
              </p>
              <Form.Root
                noValidate
                className="flex flex-col gap-6 px-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* email */}
                <Form.Field name="email" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      ایمیل
                    </Form.Label>
                    {errors.email && (
                      <Form.Message className="text-[13px] opacity-80">
                        {errors.email.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild>
                    <input
                      {...register("email", emailRules)}
                      className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                      type="email"
                      required
                    />
                  </Form.Control>
                </Form.Field>
                {/* password */}
                <Form.Field name="password" className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-sm text-stone-700">
                      رمز عبور
                    </Form.Label>
                    {errors.password && (
                      <Form.Message className="text-[13px] opacity-80">
                        {errors.password.message}
                      </Form.Message>
                    )}
                  </div>
                  <Form.Control asChild {...register("password")}>
                    <input
                      {...register("password", passwordRules)}
                      className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                      type="password"
                      required
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
