import { useRouter } from "@src/routes/hooks/use-router";
import { useSearchParams } from "@src/routes/hooks/use-search-params";
import { paths } from "@src/routes/paths";
import { useAuth } from "@src/auth/hooks/use-auth";
import { useCallback, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.customers;

  const { isAuthenticated } = useAuth();

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(returnTo);
    }
  }, [isAuthenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
