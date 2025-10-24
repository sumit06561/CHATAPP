import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/home'
import MessagePage from '../components/MessagePage'
import LogoLayout from '../layouts/LogoLayout'
import ForgotPassword from '../pages/ForgotPassword'

const router = createBrowserRouter([
{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "register",
            element: <LogoLayout><RegisterPage/></LogoLayout>
        },
        {
            path: "login",
            element: <LogoLayout><LoginPage/></LogoLayout>
        },
        {
            path: "forgot-password",
            element: <LogoLayout><ForgotPassword/></LogoLayout>
        },
        {
            path: "",
            element: <Home/>,
            children: [
                {
                    path: ":userId",
                    element: <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router