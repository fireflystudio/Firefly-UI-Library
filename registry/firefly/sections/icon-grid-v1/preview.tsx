import { IconGrid } from "./icon-grid-v1";

const ITEMS = [
  { title: "Documents sorted by hand", body: "Every format, every quality, no consistency. Someone files them all." },
  { title: "Messages never sent", body: "Follow-ups fall through the cracks and nobody notices." },
  { title: "Invoices never raised", body: "Line items are missed and the revenue is left on the table." },
  { title: "Steps not followed", body: "The right process exists, but nothing is tracked against it." },
  { title: "The same facts, four times", body: "One update is typed by hand into four different places." },
  { title: "Nobody notices for months", body: "Operational failures stay invisible until they get expensive." },
];

export default function Preview() {
  return (
    <IconGrid
      headline="Work a machine could do"
      headlineMuted="is still done by hand."
      items={ITEMS}
    />
  );
}
