export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "contained" | "outlined";
};

export function Button({ variant="contained", className="", ...rest }: ButtonProps){
  const map = { contained: "btn-contained", outlined: "btn-outlined" } as const;
  const cls = ["btn", map[variant], "btn-full", className].filter(Boolean).join(" ");
  return <button className={cls} {...rest} />;
}