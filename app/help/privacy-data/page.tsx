import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("privacy-data");

export default function Page() {
  return <HelpTopicPage slug="privacy-data" />;
}
