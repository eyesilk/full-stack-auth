import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Login",
    template: "%s | Nest + Next",
  },
  description: "Login to your account to access full features of the app.",
};

export default function LognPage() {
  return <div className="btn">login</div>;
}
