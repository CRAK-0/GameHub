export const getCurrentUser = async () => {
  const response = await fetch("http://localhost:3000/api/v1/users/me", {
    method: "GET",
    credentials: "include",
  });

  // handle response here
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to Get data");
  }

  return data;
};
