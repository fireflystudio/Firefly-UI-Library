import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-signup-card-v1",
  name: "Sign-up Card",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader account card: the mark, a title, an e-mail field and a Subscribe button. A working mock: the field takes input, the button and Enter call back.",
  interactions: ["Type an e-mail and press Subscribe or Enter (the preview does nothing with it)."],
  props: [
    { name: "title", type: "string", default: "Create your Verb account", description: "Heading." },
    { name: "subtitle", type: "string", default: "Your feed starts with one e-mail.", description: "Line under the heading." },
    { name: "placeholder", type: "string", default: "name@email.com", description: "Field placeholder." },
    { name: "buttonLabel", type: "string", default: "Subscribe", description: "Button label." },
    { name: "onSubmit", type: "(email: string) => void", description: "Called with the typed e-mail." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, moved from the Verb site where it was built and approved." }],
  files: [
    {
      path: "registry/firefly/sections/verb-signup-card-v1/verb-signup-card-v1.tsx",
      target: "components/app/verb-signup-card-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: [],
  order: 30,
  previewAlign: "center",
  previewDevice: 834,
};
