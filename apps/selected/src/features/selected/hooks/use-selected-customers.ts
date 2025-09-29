import { useEffect, useState } from "react";
import { getSelectedCustomers } from "../utils/getSelectedCustomers";
import type { User } from "@src/types";

export function useSelectedCustomers(loggedUserName: string) {
  const [selectedCustomers, setSelectedCustomers] = useState<User[]>(() => 
    getSelectedCustomers(loggedUserName)
  );
  
  useEffect(() => {
    const handleCustomerUpdated = (event: CustomEvent) => {
      if (event.detail.loggedUser === loggedUserName) {
        setSelectedCustomers(getSelectedCustomers(loggedUserName));
      }
    };

    const handleUsersCleared = (event: CustomEvent) => {
      if (event.detail.loggedUser === loggedUserName) {
        setSelectedCustomers([]);
      }
    };

    window.addEventListener('userAdded', handleCustomerUpdated as EventListener);
    window.addEventListener('userRemoved', handleCustomerUpdated as EventListener);
    window.addEventListener('usersCleared', handleUsersCleared as EventListener);

    return () => {
      window.removeEventListener('userAdded', handleCustomerUpdated as EventListener);
      window.removeEventListener('userRemoved', handleCustomerUpdated as EventListener);
      window.removeEventListener('usersCleared', handleUsersCleared as EventListener);
    };
  }, [loggedUserName]);
  
  return selectedCustomers;
}