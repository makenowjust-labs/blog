"use client";

import mermaid from "mermaid";
import { useLayoutEffect, useRef, useState } from "react";

mermaid.initialize({ startOnLoad: false });

export type Props = {
  source: string;
};

export default function MermaidRenderer({ source }: Props) {
  const [running, setRunning] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current === null || running) return;

    const node = ref.current;

    (async () => {
      setRunning(true);

      // A `data-processed` attribute is set by `mermaid` after running,
      // and `mermaid.run` skips this node if it is set, so we need to remove it.
      node.removeAttribute("data-processed");
      node.textContent = source;
      await mermaid.run({
        nodes: [node],
      });

      setRunning(false);
    })();
  }, [ref, source, running]);

  return (
    <div className="flex justify-center">
      <div ref={ref} />
    </div>
  );
}
