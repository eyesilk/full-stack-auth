import { AnimateWrapper } from "@/shared/animate-wrapper";
import { RegisterCard } from "@/widgets/registration-card";
import Image from "next/image";

export default function Register() {
  return (
    <div className="flex items-center justify-between bg-[#0f0f0f] h-screen">
      <main className="flex flex-col items-center justify-center xl:w-[60%] w-full h-full bg-[#171717] border-r-1 border-[#2e2e2e]">
        <AnimateWrapper>
          <div className="w-full xl:px-[15%] md:px-[10%] px-[7%]">
            <h1
              className={`sm:text-4xl text-3xl font-[500] text-white leading-tight md:text-5xl md:mb-9 mb-7`}
            >
              One step away from{" "}
              <strong className="text-(--shamrock) inline-block">
                something{" "}
                <strong className="underline underline-offset-[17px] decoration-wavy">
                  great
                </strong>
              </strong>
            </h1>
            <h2 className="sm:text-base text-sm font-[500] text-[#a8a8a8] leading-tight md:text-lg md:mb-6 mb-4 block w-full border-b-1 border-[#363636] pb-5">
              Create a new account
            </h2>
            <RegisterCard />
          </div>
        </AnimateWrapper>
      </main>
      <div className="h-full xl:w-[40%] hidden bg-plaid bg-drk-gray xl:flex items-center justify-center">
        <AnimateWrapper>
          <Image
            src="/assets/server.png"
            alt="server"
            width={800}
            height={0}
            layout="intrinsic"
          />
        </AnimateWrapper>
      </div>
    </div>
  );
}
