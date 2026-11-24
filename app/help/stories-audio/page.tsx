import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("stories-audio");

export default function Page() {
  return <HelpTopicPage slug="stories-audio" />;
}
