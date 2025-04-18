"use client";
import Image from "next/legacy/image";
import { ReactElement, useContext } from "react";
import { BsTwitter } from "react-icons/bs";
import { INFURA_GATEWAY } from "../../../lib/constants";
import {
  PiArrowFatLinesLeftFill,
  PiArrowFatLinesRightFill,
} from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { AnimationContext } from "@/app/providers";

function Footer() {
  const router = useRouter();
  const path = usePathname();
  const animContexto = useContext(AnimationContext);

  return (
    <div
      className={`relative w-full h-fit py-4 flex items-center justify-between gap-6 flex-col sm:flex-row mb-0 px-4 ${
        path?.includes("agent-index") && "bg-black"
      }`}
    >
      <div className="relative w-fit h-fit flex items-center justify-center gap-4 flex-col sm:flex-row">
        <div
          className="relative w-fit h-fit flex items-center justify-center ml-0 font-rain text-white text-4xl cursor-pointer active:scale-95"
          onClick={() => {
            animContexto?.setPageChange(false);
            router.push("/");
          }}
        >
          DIGITALAX
        </div>
        <div className="relative w-fit h-fit flex items-center justify-center flex-row gap-2">
          <div
            className="relative flex items-center justify-center w-fit h-fit active:scale-95 cursor-pointer"
            onClick={() => {
              animContexto?.setPageChange(false);
              router.push(
                path.includes("/en/")
                  ? path.replace("/en/", "/es/")
                  : path.replace("/es/", "/en/")
              );
            }}
          >
            <PiArrowFatLinesLeftFill size={15} color={"white"} />
          </div>
          <div className="relative flex items-center justify-center w-10 h-9">
            <Image
              draggable={false}
              layout="fill"
              src={`${INFURA_GATEWAY}/ipfs/${
                path.includes("/en/")
                  ? "QmWDGpLPFi3cejfF3uBdFfjE9v2yeyFRShn5DQhiKXgDdo"
                  : "QmNTNfAqo6v4T1fQc8YVPAnKmLTVdyripzBYyLc6HXMSEA"
              }`}
            />
          </div>
          <div
            className="relative flex items-center justify-center w-fit h-fit active:scale-95 cursor-pointer"
            onClick={() => {
              animContexto?.setPageChange(false);
              router.push(
                path.includes("/en/")
                  ? path.replace("/en/", "/es/")
                  : path.replace("/es/", "/en/")
              );
            }}
          >
            <PiArrowFatLinesRightFill size={15} color={"white"} />
          </div>
        </div>
      </div>
      <div className="relative w-fit h-fit flex items-center justify-center mr-0">
        <div className="relative w-fit h-fit mr-0 flex-row gap-3 flex items-center justify-center md:pr-2 md:order-3 order-1">
          {[
            {
              image: "QmWVdyGgXbPL5SiRnQwALHvWzAnyiXBos1oB4TVTqg7saV",
              link: "https://blog.digitalax.xyz/",
              title: "Blog",
            },
            {
              image: "QmP5349vcKLNXUhtLyZWQXB8vEbFwRcKLzzB93vxkLsvpw",
              link: "https://github.com/digitalax",
              title: "Github",
            },
            {
              image: "QmeA7R3J8FrhZuMmiFFrVqNmWzKkJCbP51pajFrYdEGBVX",
              link: "https://cypher.digitalax.xyz/autograph/digitalax",
              title: "Autograph",
            },
            {
              link: "https://twitter.com/digitalax_",
              title: "Twitter",
              component: <BsTwitter size={30} color={"#FFDCFF"} />,
            },
            {
              link: "https://youtube.com/@digitalax",
              title: "Youtube",
              image: "Qmchp1UWTavZBxq9mTbjASESgRRmsFNXzmxzaMzRSf9aax",
            },
          ].map(
            (
              item: {
                image?: string;
                title: string;
                link: string;
                component?: ReactElement;
              },
              index: number
            ) => {
              return (
                <div
                  key={index}
                  className="relative w-5 h-5 flex items-center justify-center cursor-pointer active:scale-95"
                  onClick={() => window.open(item.link)}
                  title={item.title}
                >
                  {item?.component ? (
                    item.component
                  ) : (
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${item.image}`}
                      layout="fill"
                      draggable={false}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
