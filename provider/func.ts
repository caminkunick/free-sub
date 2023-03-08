export type discordResultKey =
  | "token_type"
  | "access_token"
  | "expires_in"
  | "scope";
export const hashDecode = (
  hash: string
): Record<discordResultKey, string> | null => {
  if (hash.length > 1) {
    return hash
      .replace("#", "")
      .split("&")
      .reduce<Record<discordResultKey, string>>(
        (data, row) => {
          const [key, value] = row.split("=");
          return Object.assign(data, { [key]: value });
        },
        {
          token_type: "Bearer",
          access_token: "",
          expires_in: "604800",
          scope: "email+identify",
        }
      );
  }
  return null;
};
