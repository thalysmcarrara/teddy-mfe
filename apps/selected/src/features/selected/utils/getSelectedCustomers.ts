import type { User } from "@src/types";

export function getSelectedCustomers(loggedUserName: string): User[] {
  const storageKey = `selected-users-${loggedUserName}`;
  
  try {
    const existingCustomersJson = localStorage.getItem(storageKey);
    
    if (!existingCustomersJson) {
      return [];
    }
    
    const customersList = JSON.parse(existingCustomersJson);
    
    if (!Array.isArray(customersList)) {
      return [];
    }
    
    return customersList;
  } catch (error) {
    console.error('Erro ao ler usuários do localStorage:', error);
    return [];
  }
}