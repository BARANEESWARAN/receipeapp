import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const[cookies,setCookies]=useCookies(["access_token"])

    useEffect(()=>{
        if(!cookies?.access_token||!localStorage.getItem("userId")){
            navigate("/auth")
        }
            },[])
const navigate=useNavigate()
    const handleLogout=()=>{
        setCookies("access_token","")
        localStorage.removeItem("userId")
        navigate("/auth")

    }
  return (
   <header className='header-container'>
<nav>
    <Link to={"/home"}>Home</Link>
    <Link to={"/auth"}>Auth</Link>
    <Link to={"/createrecipe"}>CreateRecipe</Link>
    <Link to={"/savedrecipes"}>SavedRecipes</Link>

    {!cookies?.access_token?<Link to={"/auth"} className='auth-btn'>Login/Register</Link>:<button onClick={handleLogout} className='auth-btn'>Logout</button>}
</nav>

   </header>
  )
}

export default Navbar