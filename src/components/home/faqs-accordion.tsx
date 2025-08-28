"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { IAppQuestionsAnswer } from "@/utils/types";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
const FaqsAccordion = ({ faqs }: { faqs: IAppQuestionsAnswer[] }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-3 rounded-2xl"
    >
      {faqs.map((item) => (
        <AccordionItem
          value={item.id.toString()}
          key={item.id}
          className="bg-[#F4F7F9] text-[#404040] rounded-3xl py-3 px-6 transition-[background,color] duration-300 ease-in-out data-[state=open]:bg-gradient-to-br data-[state=open]:from-main data-[state=open]:to-main/90 data-[state=open]:text-white"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="cursor-pointer  focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-t-md py-5 text-left text-sm text-[15px] leading-6 font-semibold outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
              {item.question}
              <PlusIcon
                size={22}
                className="pointer-events-none shrink-0 transition-transform duration-200 text-current"
                aria-hidden="true"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="pb-2 border-t-[rgba(181,181,181,1)]  border-t">
            <div className="mt-3">{item.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsAccordion;
