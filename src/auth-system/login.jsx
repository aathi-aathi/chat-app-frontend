import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { userLogin } from "../apis";
const Login = () =>{
const [isChecked,setIsChecked]= useState(false)
const [loading,setLoading] = useState(false)
const [passType,setPassType] =useState('password')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]= useState('')
const navigate = useNavigate()
const handleCheck= (e)=>{
    setIsChecked(e.target.checked)
    if(e.target.checked){
        setPassType('text')
    }else{
        setPassType('password')
    }
}
const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
   const data =  await userLogin({email,password})
  

    setLoading(false)
if(data.code == 0){
    setError('Incorrect password')
}else if(data.code == 1){
    setError('Please register your account,if you already registered, Please verify Your account.')
}else{
    window.localStorage.setItem('token',data.token)
    window.localStorage.setItem('isAuthenticate',true)
   navigate('/home') 
}} 

    return(
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-200 to-teal-500">
        <div className="rounded h-fit w-11/12 max-w-96 flex flex-col justify-center items-center bg-black shadow-lg" >
            <h1 className="text-3xl font-black text-teal-400 mt-4 mb-2">WELCOME BACK !</h1>
            {error && <p className="font-bold text-red-700 mb-2 text-center">{error}</p>}
            <form className="w-4/5" onSubmit={handleSubmit}>
            <label>
                 <input 
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className=" pl-2 focus:outline-none
                 border border-teal-400 bg-inherit placeholder:text-sm placeholder:text-teal-400 text-teal-400 rounded block w-full h-9 mb-4
                 placeholder:italic"
                 type="email" placeholder="Enter your Email..." required/>
            </label>
            <label>
                 <input 
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 className="pl-2 focus:outline-none
                 border border-teal-400 bg-inherit placeholder:text-sm placeholder:text-teal-400 text-teal-400 rounded block w-full h-9 mb-2
                 placeholder:italic"
                 type={passType} placeholder="Enter your Password..." required/>
            </label>
           
            <div className="flex justify-between  mb-4">
                <label className="flex gap-1"><input type='checkbox' checked={isChecked} onChange={handleCheck} className="cursor-pointer"/>
                <span className="text-sm text-teal-400">Show Password</span></label>
                <Link className="text-sm text-teal-400" to="/forgot-password">Forgot Password?</Link>
            </div>
            <button className="flex justify-center bg-teal-400 rounded w-full p-2 text-white hover:bg-teal-500 mb-2 ...">
            {loading ? <div className="w-5 h-5 border-4 border-t-transparent 
            border-white rounded-full animate-spin" 
            role="status"><span className="sr-only">Loading...</span>
            </div>: 'Login'}
            </button> 
             </form>
            <p className="text-sm mb-4 text-white">Don't have an account?<Link className="text-sm text-teal-300" to='/'>Sign Up</Link></p>
        </div>
        </div>
    )
}
export default Login;