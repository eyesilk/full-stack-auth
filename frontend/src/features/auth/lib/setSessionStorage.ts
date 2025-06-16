export function setSessionStorage(
  id: string,
  email: string,
  displayName: string,
  avatar: string,
) {
  sessionStorage.setItem(
    "account",
    JSON.stringify({
      id,
      email,
      displayName,
      avatar,
    }),
  );
  console.log(sessionStorage.getItem("account"));
}
