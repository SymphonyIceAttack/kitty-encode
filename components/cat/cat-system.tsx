"use client";

import { useCat } from "@/context/cat-context";
import { CatHomeModal } from "./cat-home-modal";
import { CatMascot } from "./cat-mascot";
import { FallingItems } from "./falling-item";

export function CatSystem() {
  const { itemsOnGround, removeItem } = useCat();

  const handleCollect = (type: string) => {
    // Find the first item of this type and remove it
    const itemToRemove = itemsOnGround.find((item) => item.type === type);
    if (itemToRemove) {
      removeItem(itemToRemove.id);
    }
  };

  return (
    <>
      {/* Falling items */}
      <FallingItems
        items={itemsOnGround.map((item) => item.type)}
        onCollect={handleCollect}
      />

      {/* Cat mascot */}
      <CatMascot />

      {/* Cat home modal */}
      <CatHomeModal />
    </>
  );
}
