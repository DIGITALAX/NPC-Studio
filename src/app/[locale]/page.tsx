"use client";
import { useTranslations } from "next-intl";
import Dialog from "@/components/game/modules/Dialog";
import Log from "@/components/game/modules/Log";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/game/modules/Studio"),
  { ssr: false }
);

export default function IndexPage() {
  const t = useTranslations("Home");
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  return (
    <div className="relative w-full h-fit min-w-screen flex items-center justify-center flex-col gap-10 min-h-fit md:bg-transparent bg-black md:px-4 md:pt-4">
      <div className="relative w-full xl:h-[692px] h-fit flex items-center justify-center flex-col xl:flex-row gap-6">
        <Log
          t={t}
          connected={isConnected}
          openConnectModal={openConnectModal}
        />
        <div className="relative w-full xl:w-[1512px] h-[800px] xl:h-full border-cielo md:border-8 flex overflow-hidden rounded-md bg-cielo xl:order-2 order-1">
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <Dialog />
    </div>
  );
}
