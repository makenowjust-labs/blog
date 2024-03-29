export type Props = React.PropsWithChildren<{}>;

export default function MdxWrapper({ children }: Props) {
  return (
    <div className="prose-h4:text-md prose prose-stone prose-code:px-2 max-w-full pb-5 prose-h1:border-b-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
      {children}
    </div>
  );
}
