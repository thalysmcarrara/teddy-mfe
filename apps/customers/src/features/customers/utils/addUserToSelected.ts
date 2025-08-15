export type User = {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
};

export function addUserToSelected(user: User, loggedUserName: string): void {
  const storageKey = `selected-users-${loggedUserName}`;
  
  try {
    const existingUsersJson = localStorage.getItem(storageKey);
    let usersList: User[] = [];
    
    if (existingUsersJson) {
      usersList = JSON.parse(existingUsersJson);
      
      if (!Array.isArray(usersList)) {
        usersList = [];
      }
    }
    
    usersList.push(user);
    
    localStorage.setItem(storageKey, JSON.stringify(usersList)); 

    const customEvent = new CustomEvent('userAdded', {
      detail: {
        user: user,
        loggedUser: loggedUserName,
        totalUsers: usersList.length
      }
    });
    
    window.dispatchEvent(customEvent);
    
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
  }
}
