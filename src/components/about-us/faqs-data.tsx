"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, PlusIcon } from "lucide-react";

const items = [
  {
    id: "1",
    title: "How do i Choose the right Product for my ?",
    content:
      "Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,",
  },
  {
    id: "2",
    title: "What is your return and exchange policy ?",
    content:
      "Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,Lorem ipsum dolor sit amet, conummy dolor sit amet,",
  },
  {
    id: "3",
    title: "What is your return and exchange policy ?",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes for amet, consectetuer elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes for amet, consectetuer  elit, sed diam nonummy dolor sit amet,",
  },
  {
    id: "4",
    title: "How do i Choose the right Product for my ?",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes for amet, consectetuer elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit yes for amet, consectetuer  elit, sed diam nonummy dolor sit amet,",
  },
];
const FaqsData = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item) => (
        <AccordionItem
          value={item.id}
          key={item.id}
          className=" bg-[white] border !border-b border-input mb-3 rounded-2xl p-3"
        >
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger className="group cursor-pointer text-[#020202] focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50">
              {item.title}
              <div className="relative cursor-pointer size-6  rounded-lg  p-4 flex items-center justify-center">
                {/* Arrow Left Icon - Visible when closed */}
                <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transition-opacity duration-300 text-[#020202] opacity-100 group-data-[state=open]:opacity-0">
                  <PlusIcon
                    size={20}
                    className="pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </span>

                {/* Plus Icon - Hidden when closed, visible and rotated when open */}
                <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transition-all duration-300 text-[#020202] opacity-0 group-data-[state=open]:opacity-100 ">
                  <Minus
                    size={22}
                    className="pointer-events-none shrink-0"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="text-[#020202] pb-2">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqsData;
