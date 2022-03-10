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
          <h1 className="text-3xl pb-5 text-stone-900 font-bold hover:underline hover:cursor-pointer">
            <Link href="/">{title}</Link>
          </h1>
          <p className="text-lg text-stone-800">{description}</p>
        </div>
      </div>
    </section>
  );
}
