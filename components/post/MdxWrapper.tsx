export type Props = React.PropsWithChildren<Record<string, unknown>>;

export default function MdxWrapper({ children }: Props) {
  return (
    <div className="prose prose-stone max-w-full break-words prose-h1:border-b-2 prose-code:px-2 pb-5 prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none">
      {children}
    </div>
  );
}
