"use client";

import Script from "next/script";
import { EventHandler, SyntheticEvent, createRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { useKey } from "react-use";

import { BLOG_BASE_PATH } from "@/src/meta";

declare global {
  interface Window {
    PagefindUI: any;
  }
}

export default function Pagefind() {
  const dialogRef = createRef<HTMLDialogElement>();
  const searchRef = createRef<HTMLDivElement>();

  const setupSearchBox = useCallback(() => {
    new window.PagefindUI({ element: searchRef.current });
  }, [searchRef]);

  const openSearchBox = useCallback(
    (event: Event | SyntheticEvent) => {
      if (!dialogRef.current?.open) {
        dialogRef.current?.showModal();
        event.preventDefault();
      }
    },
    [dialogRef],
  );

  useKey(
    (key) => (key.metaKey && key.key === "k") || key.key === "/",
    openSearchBox,
  );

  return (
    <>
      <Script
        strategy="lazyOnload"
        onReady={setupSearchBox}
        src={`${BLOG_BASE_PATH}/pagefind/pagefind-ui.js`}
        stylesheets={[`${BLOG_BASE_PATH}/pagefind/pagefind-ui.css`]}
      />
      <button className="btn btn-square" onClick={openSearchBox}>
        <FaSearch />
      </button>
      <dialog className="modal" ref={dialogRef}>
        <div className="modal-box">
          <div ref={searchRef} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
