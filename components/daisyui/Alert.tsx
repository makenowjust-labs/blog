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
    ? `py-0 my-[1.25em] alert ${colorToClassName[color]}`
    : "py-0 my-[1.25em] alert";
  return (
    <div role="alert" className={className}>
      <div>{children}</div>
    </div>
  );
}
