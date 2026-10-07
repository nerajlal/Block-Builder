export default function InstallationGuide() {
  return <s-page heading="Installation guide"><s-section heading="Add a block to your product page">
    <s-ordered-list><s-list-item>Open the Block library and choose Install in theme.</s-list-item><s-list-item>In the theme editor, select a regular product from the Preview selector if Shopify shows a gift card or an empty product.</s-list-item><s-list-item>Find the block under Product information, move it near the information you want shoppers to see, and edit its settings.</s-list-item><s-list-item>Preview on desktop and mobile, then save your theme.</s-list-item></s-ordered-list>
    <s-paragraph>If your theme cannot place the block under Product information, use Add as separate section in the library. That creates an Apps section which can appear below other product sections; move it in the template as needed. The Scroll to top utility is an app embed rather than a product block.</s-paragraph>
  </s-section></s-page>;
}
