import { BrowserRouter, Routes, Route } from "react-router-dom"
import Calendario from "./Views/Calendario"
import PrincipalLayout from "./layout/PrincipalLayout"
import AdminCalendarios from "./Views/AdminCalendarios"
import Users from "./Views/Users"
import AdminUser from "./Views/AdminUser"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrincipalLayout/>}>
                    <Route path="/" element={<Calendario/>} />
                    <Route path="/admincalendarios" element={<AdminCalendarios/>} />
                    <Route path="/usuarios/:userId" element={<AdminUser />} />
                    <Route path="/usuarios" element={<Users/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
