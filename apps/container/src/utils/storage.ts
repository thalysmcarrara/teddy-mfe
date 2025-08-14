export const getUserFromLocalstorage = () => {
  const stored = localStorage.getItem('user');
  return stored && stored.trim() !== '' ? stored : '';
}