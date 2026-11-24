import HelpTopicPage, { helpTopicMetadata } from "@/components/help/HelpTopicPage";

export const metadata = helpTopicMetadata("notes-notebooks");

export default function Page() {
  return <HelpTopicPage slug="notes-notebooks" />;
}
