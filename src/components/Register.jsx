import { useRef, useState, useEffect, useContext } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "../style";
import { Link, Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { AuthContext } from "../auth";


const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const {currentUser}  = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to={'/'}></Navigate>
    }

    const emailRef = useRef();
    const nameRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [ValidEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(true);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(email);
        setValidPwd(result);
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //prevent invalid entry
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, pwd).then(async (userCredentials) => {
            const user = userCredentials.user;
            await setDoc(doc(db, 'users', user.uid), {
                userName: name,
                userRole: 420,
                userEmail: email
            });
        }).catch((error) => {
            setErrMsg(error.code, error.message);
            console.error(error);
        })

    }

    

    return (
        <>
            {success ? (
                <section className='w-full overflow-hidden relative z-[1] text-white'>
                    <div className={` ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} `}>
                        <div className={`${styles.boxWidth}  register duration-75 ease-linear`}>
                            <h1 className=' text-[49px]'>Registrierung erfolgreich!</h1>
                            <p>
                                <a href="/login" className='underline'>Anmelden</a>
                            </p>
                        </div>
                    </div>
                </section>) : (

            <section className='w-full overflow-hidden relative z-[1] text-white'>
                <div className={` ${styles.flexCenter} ${styles.paddingX} ${styles.paddingY} `}>
                    <div className={`${styles.boxWidth}  register duration-75 ease-linear`}>
                        <p ref={errRef} className={ errMsg ? "text-red-500 bg-red-300 p-3 rounded-md" : "absolute -left-[9000rem]"} aria-live='assertive'>{errMsg}</p>
                        <h1 className=' text-[49px]'>Registrieren</h1>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Nutzername:
                                <span className={name ? "text-lime-500 pl-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={name ? "hidden" : "text-red-500 pl-2"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="name" 
                                id='name' 
                                ref={nameRef} 
                                autoComplete='off' 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                aria-invalid={name ? "false" : "true"} 
                                aria-describedby='uidnote' 
                                onFocus={() => setNameFocus(true)} 
                                onBlur={() => setNameFocus(false)}
                                className='text-black'
                            />

                            <label htmlFor="email">
                                Email Adresse:
                                <span className={ValidEmail ? "text-lime-500 pl-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={ValidEmail || !email ? "hidden" : "text-red-500 pl-2"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="email" 
                                id='email' 
                                ref={emailRef} 
                                autoComplete='off' 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                aria-invalid={ValidEmail ? "false" : "true"} 
                                aria-describedby='uidnote' 
                                onFocus={() => setEmailFocus(true)} 
                                onBlur={() => setEmailFocus(false)}
                                className='text-black'
                            />
                            <p id='uidnote' className={emailFocus && email && !ValidEmail ? "relative" : "absolute -left-[9000rem]"}>
                                <FontAwesomeIcon icon={faInfoCircle}/><br />
                                Valide E-Mail adresse. <br />
                                Muss ein @-Zeichen enthalten. <br />
                            </p>

                            <label htmlFor="password" className=''>
                                Passwort:
                                <span className={validPwd ? "text-lime-500 pl-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </span>
                                <span className={validPwd || !pwd ? "hidden" : "text-red-500 pl-2"}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span>
                            </label>
                            <input type="password" 
                                id='password'  
                                onChange={(e) => setPwd(e.target.value)} 
                                required 
                                aria-invalid={validPwd ? "false" : "true"} 
                                aria-describedby='pwdnote' 
                                onFocus={() => setPwdFocus(true)} 
                                onBlur={() => setPwdFocus(false)} 
                                className='text-black'
                            />
                            <p id='pwdnote' className={pwdFocus && !validPwd ? "relative" : "absolute -left-[9000rem]"}>
                                <FontAwesomeIcon icon={faInfoCircle}/><br />
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase letters, a number and a special character. <br />
                                Allowed Special characters: <span aria-label='excalamtion mark'>!</span> 
                                <span aria-label='at symbol'>@</span> 
                                <span aria-label='hashtag'>#</span> 
                                <span aria-label='dollar sign'>$</span> 
                                <span aria-label='percent'>%</span>.
                            </p>

                            <button disabled={!ValidEmail || !validPwd ? true : false} className='relative py-4 px-8 font-poppins font-medium text-[18px] text-white outline-none rounded-[10px] bg-pink-gradient hover:rounded-3xl duration-75 ease-linear active:mt-[0.15rem] active:-mb-[0.15rem] active:box-shadow-2'>Registrieren</button>
                        </form>
                        <p>
                            Bereits registriert?<br />
                            <span className='line'>
                                <Link to={"/login"} className=' underline '>Anmelden</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        )}</>
    )
}

export default Register