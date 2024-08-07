export type Props = React.PropsWithChildren<{}>;

export default function MdxWrapper({ children }: Props) {
  return (
    <div className="prose prose-stone max-w-full break-words pb-5 prose-h1:border-b-2 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-code:px-2">
      {children}
    </div>
  );
}
