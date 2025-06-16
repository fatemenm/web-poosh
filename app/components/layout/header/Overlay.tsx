import * as Portal from "@radix-ui/react-portal";

export default function Overlay() {
  return (
    <Portal.Root>
      <div className="fixed left-0 top-0 h-screen w-screen bg-stone-800 bg-opacity-50" />
    </Portal.Root>
  );
}
