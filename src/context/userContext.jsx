import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebade"; // Make sure this is correctly named

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          isLogin: true,
          userInfo: {
            email: user.email,
            photoURL: user.photoURL, 
            name: user.displayName,
          },
        });
        console.log("User is logged In");
      } else {
        setUser({
          isLogin: false,
          userInfo: {},
        });
        console.log("User is not logged In");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;



