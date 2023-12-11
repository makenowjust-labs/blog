export type Props = React.PropsWithChildren<{}>;

export default function MdxWrapper({ children }: Props) {
  return (
    <div className="prose-h4:text-md prose prose-stone max-w-full pb-5 pl-4 prose-h1:border-b-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:px-0">
      {children}
    </div>
  );
}
