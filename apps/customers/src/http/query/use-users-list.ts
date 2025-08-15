import type { PaginatedUsers } from "@src/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchUsers } from "@src/services/api/users";

export function useUsersList(page: number, limit: number) {
  return useQuery<PaginatedUsers, Error>({
    queryKey: queryKeys.usersList(page, limit),
    queryFn: async () => {
      const result = await fetchUsers({ page, limit });

      return result
    },
    placeholderData: (prev) => prev,
    staleTime: 10_000,
  });
}