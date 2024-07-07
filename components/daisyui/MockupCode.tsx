export type Props = {
  prefix: string;
  code: string;
};

export default async function MockupCode({ prefix, code }: Props) {
  return (
    <div className={"not-prose mockup-code"}>
      <pre data-prefix={prefix}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
