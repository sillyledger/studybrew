import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("getting-started");

export default function Page() {
  return <HelpTopicPage slug="getting-started" />;
}
