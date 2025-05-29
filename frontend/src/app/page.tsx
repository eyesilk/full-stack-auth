import EyesilkOTP from "@/widgets/eyesilk-otp-animate/ui/EyesilkOTP";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <section className="h-screen min-h-175 w-full flex flex-col justify-center items-center px-6">
        <h1 className="sm:text-5xl text-4xl font-[500] text-white leading-tight md:text-6xl mb-7">
          Simple registration <br />
          <strong className="text-(--shamrock) inline-block">
            In{" "}
            <strong className="font-(family-name:--font-dancingscript)">
              few
            </strong>{" "}
            clicks
          </strong>
        </h1>
        <p className="text-xs/snug text-pretty text-white md:text-base/relaxed sm:text-xs/snug mb-5 opacity-80">
          The project is developed on <br /> Next + Nest using clean
          architecture principles <br />
          on the server and FSD on the client.
        </p>
        <div className="mt-4 sm:mt-6 mb-15">
          <button className="btn mr-4">Let's begin</button>
          <button className="btn btn-gray">
            <a
              href="https://github.com/eyesilk/full-stack-auth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </button>
        </div>
        <EyesilkOTP />
      </section>
    </div>
  );
}
