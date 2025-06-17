import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Dashboard",
    template: "%s | Nest + Next",
  },
  description:
    "View your personal information, profile settings, and activity all in one place.",
};

function DashboardPage() {
  return <div></div>;
}

export default DashboardPage;
