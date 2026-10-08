"use client";

import { PlusIcon } from "@/components/icons";
import Link from "next/link";

function CreateInvoiceBtn() {
  return (
    <Link
      className="bg-brand-primary focusable-ring  flex gap-2 md:gap-4 items-center py-1.5 pl-1.5  pr-3.75 md:py-2 md:pl-2 md:pr-4.25 rounded-3xl heading-S2"
      href={`/invoices/new`}
      onClick={(e) => {
        window.__lastModalTriggerElement = e.currentTarget;
      }}
    >
      <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
        <PlusIcon className={"w-2.5 h-2.5 text-brand-primary"} />
      </span>

      <span className="text-white md:hidden">New</span>
      <span className="text-white hidden md:inline-block">New Invoice</span>
    </Link>
  );
}

export default CreateInvoiceBtn;
