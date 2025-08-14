import { useAuth } from "@src/auth/hooks/use-auth";
import { useRouter } from "@src/routes/hooks/use-router";
import { paths } from "@src/routes/paths";
import { useCallback, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.login}?${searchParams}`;

      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
