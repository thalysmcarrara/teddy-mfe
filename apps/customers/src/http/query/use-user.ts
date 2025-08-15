import type { User } from "@src/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchUserById } from "@src/services/api/users";

export function useUser(id: number) {
  return useQuery<User, Error>({
    queryKey: queryKeys.userById(id),
    queryFn: () => fetchUserById(id),
    enabled: !!id,
    staleTime: 10_000,
  });
}