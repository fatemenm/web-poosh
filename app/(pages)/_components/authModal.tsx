import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import AuthTabs from "./authTabs";

export default function AuthModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-stone-800 bg-opacity-50" />
        <Dialog.Content className="xs:w-9/12 xs:p-2 fixed left-1/2 top-28 z-20 w-11/12 -translate-x-1/2 rounded-sm bg-white p-1 text-xs sm:w-8/12 md:w-6/12 md:text-base lg:w-[500px]">
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
          <AuthTabs changeOpen={onOpenChange} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
