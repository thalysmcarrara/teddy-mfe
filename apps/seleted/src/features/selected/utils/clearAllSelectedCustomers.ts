export function clearAllSelectedUsers(loggedUserName: string): void {
  const storageKey = `selected-users-${loggedUserName}`;

  try {
    localStorage.setItem(storageKey, JSON.stringify([]));
    
    const customEvent = new CustomEvent('usersCleared', {
      detail: {
        loggedUser: loggedUserName,
        totalUsers: 0
      }
    });
    
    window.dispatchEvent(customEvent);
    
  } catch (error) {
    console.error('Erro ao limpar usuários:', error);
  }
}