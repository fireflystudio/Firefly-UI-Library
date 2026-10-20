"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ThankYouBar } from "../popups-thank-you-bar-v1/popups-thank-you-bar-v1";
import { SignupPopup } from "./popups-signup-v1";

/** Final example: the Solve waitlist flow (V2): the popup closes on Join and the Thank-you Bar slides in. */
export default function Example() {
  const [open, setOpen] = useState(true);
  const [bar, setBar] = useState(false);
  return (
    <>
      <PageFiller>
        <Button onClick={() => setOpen(true)}>Join waitlist</Button>
      </PageFiller>
      <SignupPopup
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => setBar(true)}
        title="Join the waitlist"
        body="Leave your email and we'll tell you the moment Solve opens."
        note="No spam, just the launch."
      />
      <ThankYouBar open={bar} onClose={() => setBar(false)} title="You're in." body="We will let you know when Solve launches." />
    </>
  );
}

/** Fake page under the popup so the preview frame has height and the overlay has something to dim */
function PageFiller({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden className="relative h-[640px] overflow-clip bg-surface-page px-5 pt-[120px] md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-5">
        <div className="h-9 w-3/4 rounded-pill bg-surface-muted md:h-12 md:w-1/2" />
        <div className="h-9 w-1/2 rounded-pill bg-surface-muted md:h-12 md:w-1/3" />
        <div className="mt-2 h-4 w-2/3 rounded-pill bg-surface-muted md:w-1/4" />
        <div className="mt-4">{children}</div>
        <div className="mt-10 h-[320px] w-full rounded-frame bg-surface-muted" />
      </div>
    </div>
  );
}
