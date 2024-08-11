import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

type Action = {
  action: "run" | "remove";
  node: HTMLElement;
};

const nodes: HTMLElement[] = [];
const pendingActions: Action[] = [];

let promise: Promise<void> | null = null;

const handleActions = () => {
  for (const { action, node } of pendingActions) {
    switch (action) {
      case "run":
        if (!nodes.includes(node)) {
          nodes.push(node);
        }
        break;
      case "remove":
        const index = nodes.indexOf(node);
        if (index >= 0) {
          nodes.splice(index, 1);
        }
        break;
    }
  }

  pendingActions.length = 0;
};

const createPromise = async (): Promise<void> => {
  try {
    handleActions();
    await mermaid.run({ nodes });
  } finally {
    if (pendingActions.length > 0) {
      promise = createPromise();
      return promise;
    }

    promise = null;
  }
};

export const run = async (node: HTMLElement): Promise<void> => {
  pendingActions.push({
    action: "run",
    node,
  });

  if (promise === null) {
    promise = createPromise();
  }

  return promise;
};

export const remove = (node: HTMLElement): void => {
  pendingActions.push({
    action: "remove",
    node,
  });

  if (promise === null) {
    promise = createPromise();
  }
};
