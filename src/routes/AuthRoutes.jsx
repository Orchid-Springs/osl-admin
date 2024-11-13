import { Route, Routes } from "react-router-dom"
import Admin from "../pages/Admin"
import Payments from "../pages/Payments"
import Reservations from "../pages/Reservations"
import Spaces from "../pages/Spaces"
import Promo from "../pages/Promo"
import NoMatch from "../pages/NoMatch"
import { AuthProvider } from "../context/auth"
import AddUser from "../pages/AddUser"
import Contacts from "../pages/Contacts"

const AuthRoutes = () => {
  return (
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Admin />}>
              <Route path='/payments' element={<Payments />} />
              <Route path='/reservations' element={<Reservations />} />
              <Route path='/spaces' element={<Spaces />} />
              <Route path='/promo' element={<Promo />} />
              <Route path='/user' element={<AddUser />} />
              <Route path='/contacts' element={<Contacts />} />
            </Route>
            <Route path='*' element={<NoMatch />} />

        </Routes>
      </AuthProvider>
  )
}

export default AuthRoutes