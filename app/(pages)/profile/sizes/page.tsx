"use client";

import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Form from "@radix-ui/react-form";
import * as Toast from "@radix-ui/react-toast";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";
import { createUserSize, getUserSize, updateUserSize } from "@/_lib/data";
import { UserSize } from "@/_lib/definitions";

const initialSizes = {
  height: 0,
  weight: 0,
  shoulderWidth: 0,
  chestWidth: 0,
  waistWidth: 0,
  pantsLength: 0,
  thighWidth: 0,
  hemWidth: 0,
  footSize: 0,
};

export default function Page() {
  const [userSize, setUserSize] = useState<UserSize>(initialSizes);
  const [errors, setErrors] = useState<{ height?: string; weight?: string }>(
    {}
  );
  const { setItems } = useBreadcrumb();
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const timerRef = useRef(0);

  const breadCrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    { label: "پروفایل", href: "/profile" },
    {
      label: "سایزهای من",
      href: "/sizes",
    },
  ];
  const labels = {
    height: "قد (cm)",
    weight: "وزن (kg)",
    shoulderWidth: "عرض شانه (cm)",
    chestWidth: "عرض سینه (cm)",
    waistWidth: "عرض کمر (cm)",
    pantsLength: "طول شلوار (cm)",
    thighWidth: "عرض ران (cm)",
    hemWidth: "عرض دمپا (cm)",
    footSize: "اندازه کف پا (cm)",
  };

  useEffect(() => {
    setItems(breadCrumbItems);
  }, [setItems]);

  useEffect(() => {
    const getData = async () => {
      const sizes = await getUserSize();
      if (!sizes) setUserSize(initialSizes);
      else setUserSize(sizes);
    };
    getData();
    return () => clearTimeout(timerRef.current);
  }, []);

  function handleSizeChange(key: string) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUserSize((prev) => {
        if (prev) return { ...prev, [key]: Number(value) };
        else {
          const sizes: UserSize = {
            height: 0,
            weight: 0,
            [key]: value,
          };
          return sizes;
        }
      });
    };
  }

  function showSuccessToast() {
    setIsToastOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsToastOpen(true);
    }, 100);
  }

  function validateForm() {
    const newErrors: { height?: string; weight?: string } = {};
    if (!userSize.height) newErrors.height = "لطفا قد خود را وارد کنید";
    if (!userSize.weight) newErrors.weight = "لطفا وزن خود را وارد کنید";
    setErrors(newErrors);
    return !newErrors.height && !newErrors.weight;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      let newSize;
      if (userSize.documentId) {
        newSize = await updateUserSize({ ...userSize });
        setToastMessage("سایزها باموفقیت به روز شدند");
      } else {
        newSize = await createUserSize({ ...userSize });
        setToastMessage("سایزها باموفقیت ثبت شدند");
      }
      setUserSize(newSize);
      showSuccessToast();
    } catch (error) {
      console.error("Failed to create size:", error);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <p className="w-60 border-b-2 border-b-stone-700 pb-4 text-2xl">
        سایز های من
      </p>
      <Form.Root className="flex flex-col gap-10 px-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-10">
          {Object.entries(userSize).map(([key, value]) => {
            type LabelKey = keyof typeof labels;
            const isLabelKey = (key: string): key is LabelKey => key in labels;
            if (!isLabelKey(key)) return null;
            return (
              <Form.Field key={key} name={key} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <Form.Label className="text-sm text-stone-700">
                    {labels[key]}
                  </Form.Label>
                  {errors[key as "weight" | "height"] && (
                    <Form.Message className="text-sm text-stone-500">
                      {errors[key as "weight" | "height"]}
                    </Form.Message>
                  )}
                </div>
                <Form.Control asChild>
                  <input
                    value={value ? value.toString() : ""}
                    onChange={handleSizeChange(key)}
                    className="w-full border border-stone-500 px-2 py-3 focus:border-stone-900 focus:outline-none"
                    type="number"
                    onFocus={() => {
                      if (key === "height")
                        setErrors((prev) => ({ ...prev, height: "" }));
                      if (key === "weight")
                        setErrors((prev) => ({ ...prev, weight: "" }));
                    }}
                  />
                </Form.Control>
              </Form.Field>
            );
          })}
        </div>
        <Form.Submit asChild className="w-24 self-end">
          <button className="bg-stone-800 px-2 py-4 text-center text-sm text-white">
            ذخیره
          </button>
        </Form.Submit>
      </Form.Root>
      <Toast.Root
        duration={3000}
        dir="rtl"
        open={isToastOpen}
        onOpenChange={setIsToastOpen}
        className="data-[state=closed]:animate-hide data-[state=open]:animate-slideIn flex items-center justify-between gap-1 rounded-md border bg-green-100 p-4"
      >
        <Toast.Description className="">{toastMessage}</Toast.Description>
        <Toast.Close asChild className="text-stone-500 hover:text-stone-600">
          <FontAwesomeIcon icon={faClose} className="text-[16px]" />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:25px]" />
    </div>
  );
}
