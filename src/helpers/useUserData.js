import { useQuery } from "@tanstack/react-query";

export const useUserData = (userId) => {
  const usersData = useQuery(
    ["users", userId],
    () => {
      return fetch(`api/users/${userId}`).then((res) => res.json());
    },
    {
      staleTime: 5000,
    }
  );

  return usersData;
};
