"use client";

import { PlusIcon } from "@/components/icons";
import Link from "next/link";

function CreateInvoiceBtn() {
  return (
    <Link
      className="bg-brand-primary focusable-ring  flex gap-2 items-center pt-1.5 pl-1.5 pb-1.5 pr-3.75 rounded-3xl heading-S2"
      href={`/invoices/new`}
      onClick={(e) => {
        window.__lastModalTriggerElement = e.currentTarget;
      }}
    >
      <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center shrink-0">
        <PlusIcon className={"w-2.5 h-2.5 text-brand-primary"} />
      </span>

      <span className="text-white">New</span>
    </Link>
  );
}

export default CreateInvoiceBtn;
