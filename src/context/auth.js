import { createContext, useContext, useEffect, useState } from "react";
import { Result } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/login')
    }

    useEffect(() => {
        const authUser = localStorage.getItem('user');
        if(authUser) {
            setUser(JSON.parse(authUser))
        }
    }, [])

    if (!user) {
        return (
          <Result
            status="403"
            title="Unauthorised Access"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Link replace to="/login">
                Login here
              </Link>
            }
          />
        );
      }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}