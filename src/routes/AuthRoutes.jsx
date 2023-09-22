import { Route, Routes } from "react-router-dom"
import Admin from "../pages/Admin"
import Payments from "../pages/Payments"
import Reservations from "../pages/Reservations"
import Spaces from "../pages/Spaces"
import Promo from "../pages/Promo"
import NoMatch from "../pages/NoMatch"
import { AuthProvider } from "../context/auth"

const AuthRoutes = () => {
  return (
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Admin />}>
              <Route path='/payments' element={<Payments />} />
              <Route path='/reservations' element={<Reservations />} />
              <Route path='/spaces' element={<Spaces />} />
              <Route path='/promo' element={<Promo />} />
            </Route>
            <Route path='*' element={<NoMatch />} />

        </Routes>
      </AuthProvider>
  )
}

export default AuthRoutes