import type { User } from "@src/types";

export function removeCustomerFromSelected(userId: number, loggedUserName: string): void {
  const storageKey = `selected-users-${loggedUserName}`;

  try {
    const existingUsersJson = localStorage.getItem(storageKey);

    if (!existingUsersJson) {
      return;
    }
    
    let usersList: User[] = JSON.parse(existingUsersJson);
    
    if (!Array.isArray(usersList)) {
      return;
    }
    
    usersList = usersList.filter(user => user.id !== userId);
    
    localStorage.setItem(storageKey, JSON.stringify(usersList));

    const customEvent = new CustomEvent('userRemoved', {
      detail: {
        userId: userId,
        loggedUser: loggedUserName,
        totalUsers: usersList.length
      }
    });
    
    window.dispatchEvent(customEvent);
    
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
  }
}
