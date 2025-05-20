import { useOutletContext, Link } from "react-router-dom";
import { faArrowLeft, faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../style";

const EmailReader = () => {
    const [mailToRead, setMailToRead] = useOutletContext();


    return (
        <div>
            <Link onClick={() => setMailToRead(null)} className="group">
                <h1 className='font-poppins font-semibold text-[30px] text-white leading-[66.8px] w-full border-b-2 border-neutral-6'>
                    <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-ml-2 group-hover:mr-2 duration-75 ease-linear"/> 
                    &nbsp;Zurück
                </h1>
            </Link>
            <br />
            <p className={`${styles.paragraph}`}>{mailToRead.userName} {'<' + mailToRead.userEmail + '>'} / {mailToRead.createDate}</p>
            <p className={`${styles.paragraph} text-white mt-5`}>{mailToRead.userMessage}</p>
        </div>
    )
}

export default EmailReader