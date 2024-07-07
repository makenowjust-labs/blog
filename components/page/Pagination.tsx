import Link from "next/link";

export type Props = {
  next: string | null;
  prev: string | null;
};

const NextIcon = () => (
  <svg
    className="h-6 w-6 fill-current md:h-8 md:w-8"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
  </svg>
);

const PrevIcon = () => (
  <svg
    className="h-6 w-6 fill-current md:h-8 md:w-8"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
  </svg>
);

export default function Pagination({ next, prev }: Props) {
  return (
    <div className="flex justify-between">
      {next !== null ? (
        <div>
          <Link href={next} className="btn btn-sm md:btn-md">
            <NextIcon />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {prev !== null ? (
        <div>
          <Link href={prev} className="btn btn-sm md:btn-md">
            <PrevIcon />
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
