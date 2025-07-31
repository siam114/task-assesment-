import { toast } from "react-toastify";
const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const apiCall = async (
  url: string,
  method = "GET",
  body = null,
  withAuth = true
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  const options: Record<string, any> = {
    method,
    headers,
    credentials: withAuth ? "include" : "omit",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);

  if (!res.ok) {
    const error = await res.json();
    toast.error(error.message);
    throw new Error(error.msg || "Request failed");
  }

  return res.json();
};
