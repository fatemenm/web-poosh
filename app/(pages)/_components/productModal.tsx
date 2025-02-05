import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import GallerySlider from "@/_components/gallerySlider";
import { ProductModel } from "@/_models/product.model";

export default function ProductModal({
  isOpen,
  onOpenChange,
  product,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  product: ProductModel;
}) {
  return (
    <Dialog.Root
      modal
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex justify-center overflow-y-auto bg-black/50">
          <Dialog.Content className="absolute my-6 flex w-full min-w-[300px] max-w-4xl flex-col rounded-md border border-stone-500 bg-white p-0">
            <VisuallyHidden.Root asChild>
              <Dialog.Title>مشاهده سریع محصول</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                نمایش جزییات محصول - شامل عکس ها - رنگ ها و سایزها
              </Dialog.Description>
            </VisuallyHidden.Root>
            <Dialog.Close className="absolute right-2 top-3 px-2 text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faClose} className="text-[16px]" />
            </Dialog.Close>
            <div className="flex flex-row">
              <div className="w-1/2">
                <GallerySlider
                  images={product.getImagesByColor(
                    product.getAvailableColors()[0].name
                  )}
                  isExpandable={true}
                />
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
