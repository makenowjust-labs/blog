"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

export default function Page1() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });

  return "トップページに遷移します";
}
