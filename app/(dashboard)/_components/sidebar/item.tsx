"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { usePage } from "../../_context/pageContext";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export function Item({ id, imageUrl, name }: ItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const {updateSelected} = usePage();


  const isActive = organization?.id === id;

  const onClick = () => {
    updateSelected("other");
    if (!setActive) return;

    setActive({
      organization: id,
    });
  };

  return (
    <div className="aspect-square relative">
      <Hint
        label={name}
        side="right"
        align="start"
        sideOffset={18}
      >
        <Image
          src={imageUrl}
          onClick={onClick}
          alt={name}
          fill
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
}