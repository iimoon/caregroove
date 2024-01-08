import { useState } from "react"

export default function useAuth(initialvalue) {
    const [isauth, setIsAuth] = useState(initialvalue)
    function login() {
        setTimeout(() => {
            setIsAuth(true)
        }, 1000);
    }
    function logout() {
        setTimeout(() => {
            setIsAuth(false)
        }, 1000);
    }
    return [isauth, login, logout];
}