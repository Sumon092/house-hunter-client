import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const { data, isLoading, refetch } = useQuery(
    "User",
    async () =>
      await fetch(`https://house-hounter-client.netlify.app/api/v1/users/user`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );
  useEffect(() => {
    if (data && data.email) {
      setAuth(true);
      setUser(data.email);
    } else {
      setAuth(false);
    }
  }, [data]);

  return { auth, refetch, user, isLoading, data };
};

export default useAuth;
