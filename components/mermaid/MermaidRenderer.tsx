"use client";

import mermaid from "mermaid";
import { memo, useEffect, useRef, useState } from "react";

mermaid.initialize({ startOnLoad: false });

const nodes: HTMLElement[] = [];
const pendingNodes: HTMLElement[] = [];
let status: "stop" | "wait" | "run" = "stop";
let promise: Promise<undefined> | null = null;
const run = async (node: HTMLElement) => {
  if (promise === null) {
    promise = new Promise(async (resolve, reject) => {
      try {
        status = "wait";
        await new Promise((resolve) => setTimeout(resolve, 10));

        status = "run";
        await mermaid.run({ nodes });
        resolve(undefined);
      } catch (err) {
        reject(err);
      } finally {
        status = "stop";
        promise = null;

        if (pendingNodes.length > 0) {
          for (node of pendingNodes) {
            run(node);
          }
        }
        pendingNodes.length = 0;
      }
    });
  }

  if (status !== "run") {
    if (!nodes.includes(node)) {
      nodes.push(node);
    }
  } else {
    pendingNodes.push(node);
  }

  await promise;
};

export type Props = {
  source: string;
};

function MermaidRenderer({ source }: Props) {
  const [renderedSource, setRenderedSource] = useState<string | null>(null);
  const [running, setRunning] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null || renderedSource === source || running) return;

    setRunning(() => true);
    setRenderedSource(() => source);
    const node = ref.current;

    (async () => {
      // A `data-processed` attribute is set by `mermaid` after running,
      // and `mermaid.run` skips this node if it is set, so we need to remove it.
      node.removeAttribute("data-processed");
      node.textContent = source;
      await run(node);

      setRunning(() => false);
    })();
  }, [source, renderedSource, running]);

  return (
    <div className="flex justify-center">
      <div className="whitespace-pre-wrap font-mono" ref={ref} />
    </div>
  );
}

export default memo(MermaidRenderer);
