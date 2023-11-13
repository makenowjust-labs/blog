import Head from "next/head";
import { useRouter } from "next/router";

export default function Page1() {
  const router = useRouter();
  const home = router.basePath;
  return (
    <Head>
      <link rel="canonical" href={home} />
      <meta http-equiv="refresh" content={`0;URL=${home}`} />
    </Head>
  );
}
