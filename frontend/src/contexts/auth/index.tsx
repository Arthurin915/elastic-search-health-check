import React, {
  createContext,
  useCallback,
  useContext,
  useEffect
} from "react";
import api from "../../api";
import { usePersistedState } from "../../hooks/usePersistedState";
import { AuthContextData, LoginRequest, LoginResponse } from "./interfaces";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = usePersistedState<AuthContextData>(
    "@HealthCheck:authentication",
    {} as AuthContextData
  );

  const login = useCallback(
    async (loginRequestObj: LoginRequest) => {
      try {
        const { data } = await api.post<LoginResponse>(
          "/login",
          loginRequestObj
        );

        setAuthData({
          token: data.token,
          email: data.email,
          access_level: data.access_level,
          id: data.id,
        } as AuthContextData);
      } catch (error) {
        alert(error);
      }
    },
    [setAuthData]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    setAuthData({} as AuthContextData);
  }, [setAuthData]);

  useEffect(() => {
    const { token } = authData;

    if (token) api.defaults.headers.authorization = `${token}`;
  }, [authData]);

  return (
    <AuthContext.Provider
      value={{
        id: authData.id,
        email: authData.email,
        access_level: authData.access_level,
        token: authData.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  } else {
    return context;
  }
};

export { AuthProvider, useAuth };

