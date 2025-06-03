import { AnimateWrapper } from "@/shared/animate-wrapper";
import { AuthStrategies } from "@/widgets/auth-strategies";
import { RegisterCard } from "@/widgets/registration-card";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex-center justify-between bg-[#0f0f0f] h-screen sm:min-h-[650px] min-h-[560px] w-full">
      <main className="flex-center flex-col xl:w-[55%] w-full bg-[#171717] border-r-1 border-[#2e2e2e]">
        <AnimateWrapper className="flex-center">
          <div className="w-full xl:px-[10%] px-[7%] h-screen sm:min-h-[650px] min-h-[560px] flex-center flex-col max-w-[1400px]">
            <h1
              className={`sm:text-3xl text-2xl font-[500] text-white leading-tight md:text-4xl md:mb-7 mb-5 w-full`}
            >
              One step away from <br />
              <strong className="text-(--shamrock) inline-block">
                something{" "}
                <strong className="underline underline-offset-[17px] decoration-wavy">
                  great
                </strong>
              </strong>
            </h1>
            <h2 className="sm:text-base text-sm font-[500] text-[#a8a8a8] leading-tight md:text-lg md:mb-6 mb-4 block w-full border-b-1 border-[#363636] pb-4">
              Create a new account or{" "}
              <Link
                href="/auth/login"
                className="text-(--shamrock) hover:underline"
              >
                login
              </Link>
            </h2>
            <AuthStrategies />
            <RegisterCard />
          </div>
        </AnimateWrapper>
      </main>
      <div className="h-full xl:w-[45%] hidden bg-plaid bg-drk-gray xl:flex xl:items-center xl:justify-center">
        <AnimateWrapper className="flex-center">
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
