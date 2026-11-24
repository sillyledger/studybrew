import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("account-plans");

export default function Page() {
  return <HelpTopicPage slug="account-plans" />;
}
