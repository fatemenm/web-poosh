import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixAccordion from "@radix-ui/react-accordion";
import * as React from "react";

export default function Accordion({
  buttonText,
  children,
}: {
  buttonText: string;
  children: React.ReactNode;
}) {
  return (
    <RadixAccordion.Root type="single" defaultValue="item-1" collapsible>
      <RadixAccordion.Item className="group" value="item-1">
        <RadixAccordion.Header>
          <RadixAccordion.Trigger className="flex w-full items-center justify-between bg-white px-3 py-2 text-sm font-light text-stone-700 hover:bg-gray-50">
            {buttonText}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="transition-transform duration-500 group-data-[state=open]:rotate-180"
            />
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content className="data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown mt-4 overflow-hidden px-5">
          {children}
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    </RadixAccordion.Root>
  );
}
