import { useDispatch } from "react-redux"
import authService from "../services/auth"
import {logout} from "../store/authSlice.js"
import { Button } from "./ui/button.jsx"
const LogoutBtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <Button onClick = {logoutHandler}>Logout</Button>
  )
}
export default LogoutBtn