export function setSessionStorage(
  id: string,
  email: string,
  displayName: string,
  avatar: string,
  isTwoFactorEnabled: boolean,
) {
  sessionStorage.setItem(
    "account",
    JSON.stringify({
      id,
      email,
      displayName,
      avatar,
      isTwoFactorEnabled,
    }),
  );
  console.log(sessionStorage.getItem("account"));
}
