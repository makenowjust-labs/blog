"use client";

import { memo, useLayoutEffect, useRef } from "react";

import * as mermaid from "@/src/mermaid";

export type Props = {
  source: string;
};

function MermaidRenderer({ source }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (node === null) {
      return;
    }

    // A `data-processed` attribute is set by `mermaid` after running,
    // and `mermaid.run` skips this node if it is set, so we need to remove it.
    node.removeAttribute("data-processed");
    node.textContent = source;

    mermaid.run(node);
    return () => mermaid.remove(node);
  }, [source]);

  return (
    <div className="flex justify-center">
      <div className="whitespace-pre-wrap font-mono" ref={ref} />
    </div>
  );
}

export default memo(MermaidRenderer);
