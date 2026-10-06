"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  id: string;
  title: React.ReactNode;
  meta?: string;
  body: React.ReactNode;
};

/**
 * Accessible accordion: real <button> + aria-expanded/controls,
 * region role, keyboard-native, single-open optional.
 * Critical summary content stays visible in the header.
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}) {
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const base = useId();

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set<string>();
      if (prev.has(id) && allowMultiple) {
        next.delete(id);
      } else if (!prev.has(id)) {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center gap-4 py-5 text-left md:gap-6"
              >
                <span className="flex-1">
                  <span className="block font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {item.title}
                  </span>
                  {item.meta ? (
                    <span className="t-small mt-1 block text-inksoft">{item.meta}</span>
                  ) : null}
                </span>
                <span
                  aria-hidden
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-ink text-paper" : "group-hover:border-ink"
                  }`}
                >
                  <ChevronDown size={18} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              data-open={isOpen}
              className="acc-panel"
            >
              <div className="acc-inner">
                <div className="pb-7 pr-2 md:pr-16">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
