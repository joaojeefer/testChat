import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface UserContextData {
	user: FirebaseAuthTypes.User;
	setUser: Dispatch<SetStateAction<any>>;
}

interface UserProviderProps {
   children: ReactNode;
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
   const [user, setUser] = useState({} as FirebaseAuthTypes.User);

   return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
