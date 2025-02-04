import Link from "next/link";

export type Props = {
  title: string;
  description: string;
};

export default function Hero({ title, description }: Props) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="max-w-md text-center">
          <h1 className="pb-5 font-bold font-impact text-3xl text-stone-900">
            <Link passHref={true} href="/" className="hover:cursor-pointer hover:underline">
              {title}
            </Link>
          </h1>
          <p className="font-impact text-lg text-stone-800">{description}</p>
        </div>
      </div>
    </section>
  );
}
