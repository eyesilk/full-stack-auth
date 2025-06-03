import { FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthStrategies() {
  return (
    <div className="flex gap-x-3 md:mb-4 mb-3 w-full">
      <a
        className="btn btn-gray w-full text-center"
        href="http://localhost:4000/oauth/github"
      >
        <FaGithub className="inline mb-1 mr-2" />
        <span>GitHub</span>
      </a>
      <a className="btn btn-gray w-full text-center">
        <FaGoogle className="inline mb-1 mr-2" />
        <span>Google</span>
      </a>
    </div>
  );
}
