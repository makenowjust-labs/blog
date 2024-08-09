export type Props = React.PropsWithChildren<{
  color?: null | "info" | "success" | "warning" | "error";
}>;

const colorToClassName = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export default async function Alert({ color, children }: Props) {
  const className = color
    ? `py-0 my-[1.25em] alert text-left ${colorToClassName[color]}`
    : "py-0 my-[1.25em] alert text-left";
  return (
    <div role="alert" className={className}>
      <div>{children}</div>
    </div>
  );
}
