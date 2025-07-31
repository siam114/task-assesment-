export function parseJwt(token: string): any {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (error) {
    window.location.replace("/login");
    return null;
  }
}
