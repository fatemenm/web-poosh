import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixAccordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import * as React from "react";

export default function Accordion({
  triggerButtonText,
  items,
  triggerButtonClass,
  defaultOpenItem = "",
}: {
  triggerButtonText: string[];
  items: React.ReactNode[];
  triggerButtonClass: string;
  defaultOpenItem?: string;
}) {
  return (
    <RadixAccordion.Root
      type="single"
      defaultValue={defaultOpenItem}
      collapsible
    >
      {items.map((item, index) => {
        return (
          <RadixAccordion.Item
            className="group"
            value={`item-${index}`}
            key={index}
          >
            <RadixAccordion.Header>
              <RadixAccordion.Trigger
                className={classNames(
                  "flex w-full items-center justify-between bg-white px-3 py-2 font-light text-stone-700 hover:bg-gray-50",
                  triggerButtonClass
                )}
              >
                {triggerButtonText[index]}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="transition-transform duration-500 group-data-[state=open]:rotate-180"
                />
              </RadixAccordion.Trigger>
            </RadixAccordion.Header>
            <RadixAccordion.Content className="mt-4 overflow-hidden px-5 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              {item}
            </RadixAccordion.Content>
          </RadixAccordion.Item>
        );
      })}
    </RadixAccordion.Root>
  );
}
