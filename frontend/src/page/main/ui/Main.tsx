import { AnimateWrapper } from "@/shared/animate-wrapper";
import { EyesilkOTP } from "@/widgets/eyesilk-otp-animate";
import Link from "next/link";

export default function Main() {
  return (
    <div className="bg-plaid flex flex-col justify-center items-center text-center">
      <AnimateWrapper>
        <section className="h-screen min-h-[400px] w-full flex flex-col justify-center items-center px-6">
          <h1
            className={`ds-dark sm:text-5xl text-4xl font-[500] text-white leading-tight md:text-6xl md:mb-7 mb-4`}
          >
            Simple registration <br />
            <strong className="text-(--shamrock) inline-block">
              In{" "}
              <strong className="font-(family-name:--font-dancingscript)">
                few
              </strong>{" "}
              clicks
            </strong>
          </h1>
          <p className="ds-dark text-xs/snug text-pretty text-white md:text-base/relaxed sm:text-xs/snug md:mb-5 mb-3 opacity-80">
            The project is developed on <br /> Next + Nest using clean
            architecture principles <br />
            on the server and FSD on the client.
          </p>
          <div className="mt-4 sm:mt-6 md:mb-15 mb-10">
            <Link href="/auth/register" className="btn mr-4">
              Let's begin
            </Link>
            <a
              href="https://github.com/eyesilk/full-stack-auth"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gray"
            >
              Source code
            </a>
          </div>
          <EyesilkOTP />
        </section>
      </AnimateWrapper>
    </div>
  );
}
