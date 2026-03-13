"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RawPayloadViewerProps = {
  payload: Record<string, unknown>;
};

export function RawPayloadViewer({ payload }: RawPayloadViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        View Raw
      </Button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="max-h-[85vh] w-full max-w-3xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Raw Payload</CardTitle>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="max-h-[65vh] overflow-auto rounded-xl border bg-secondary/20 p-4 text-xs">
                {JSON.stringify(payload, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
}
