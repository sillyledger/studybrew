import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("words-review");

export default function Page() {
  return <HelpTopicPage slug="words-review" />;
}
