import { Input } from "@/shared/input";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function RegisterCard() {
  return (
    <>
      <div className="flex gap-x-3 md:mb-4 mb-3">
        <a className="btn btn-gray w-full text-center">
          <FaGithub className="inline mb-1 mr-2" />
          <span>GitHub</span>
        </a>
        <a className="btn btn-gray w-full text-center">
          <FaGoogle className="inline mb-1 mr-2" />
          <span>Google</span>
        </a>
      </div>
      <form className="w-full">
        <label htmlFor="email" className="label-auth">
          Name
        </label>
        <Input
          className="md:mb-5 mb-3"
          placeholder="eyesilk"
          type="name"
          id="name"
          name="name"
          required
        />
        <label htmlFor="email" className="label-auth">
          Email
        </label>
        <Input
          className="md:mb-5 mb-3"
          placeholder="eyesilk@gmail.com"
          type="email"
          id="email"
          name="email"
          required
        />
        <label htmlFor="password" className="label-auth">
          Password
        </label>
        <Input
          className="md:mb-10 mb-6"
          placeholder="⦁⦁⦁⦁⦁⦁⦁"
          type="password"
          id="password"
          name="password"
          required
        />
        <button className="btn w-full">Sign up</button>
      </form>
    </>
  );
}
