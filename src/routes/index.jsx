import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import AuthRoutes from "./AuthRoutes"

export const BaseRoutes = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<AuthRoutes />} />
    </Routes>
)