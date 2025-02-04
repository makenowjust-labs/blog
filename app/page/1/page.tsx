"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page1() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  });

  return "トップページに遷移します";
}
