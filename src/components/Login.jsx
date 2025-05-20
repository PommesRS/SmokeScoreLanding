import { useRef, useState, useEffect, useContext } from 'react'
import styles from "../style";
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { AuthContext } from "../auth";

const Login = () => {
    const {currentUser}  = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (!currentUser) {
            userRef.current.focus();
        }
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, user, pwd).then((userCredentials) => {
            const user = userCredentials.user;
        }).catch((error) => {

            setErrMsg(error.code, error.message);
        })

    }

    if (currentUser) {
        return <Navigate to={'/'}></Navigate>
    }

    return (
        <section className='w-full overflow-hidden relative z-[1] text-white'>
            <div className={` ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} `}>
                <div className={`${styles.boxWidth}  register duration-75 ease-linear`}>
                    <p ref={errRef} className={ errMsg ? "text-red-500 bg-red-300 p-3 rounded-md" : "absolute -left-[9000rem]"} aria-live='assertive'>{errMsg}</p>
                    <h1 className=' text-[49px]'>Anmelden</h1>
                    <form className='flex flex-col' onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Email Adresse:
                        </label>
                        <input 
                            type="email" 
                            id='username' 
                            ref={userRef} 
                            autoComplete='off' 
                            onChange={(e) => setUser(e.target.value)}
                            value={user} 
                            required
                            className='text-black'
                        />

                        <label htmlFor="password" className=''>
                            Passwort:
                        </label>
                        <input 
                            type="password" 
                            id='password'  
                            onChange={(e) => setPwd(e.target.value)} 
                            value={pwd}
                            required 
                            className='text-black'
                        />

                        <button className='relative py-4 px-8 font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] bg-pink-gradient hover:rounded-3xl duration-75 ease-linear active:mt-[0.15rem] active:-mb-[0.15rem] active:box-shadow-2'>Anmelden</button>
                    </form>
                    <p>
                        Noch kein Konto?<br />
                        <span className='line'>
                            <Link to={"/register"} className=' underline '>Registrieren</Link>
                        </span>
                    </p>
                </div>
            </div>
        </section>

    )
}

export default Login