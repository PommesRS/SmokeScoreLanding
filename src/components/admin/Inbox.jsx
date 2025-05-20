import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom";
import styles from "../../style";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Inbox = () => {
    const [mails, setMails] = useState(null);
    const [mailToRead, setMailToRead] = useState(null);
    const [reload, setReaload] =useState(false);
    console.log(mailToRead)

    const deleteMail = async (mail) => {
        await deleteDoc(doc(db, 'inbox', mail.id));
        await deleteDoc(doc(db, 'users', mail.userId, 'messages', mail.id));
        setReaload(true);
    }

    useEffect(() => {
        let isMounted = true;

        const getMails = async () => {
            try {
                await getDocs(collection(db, "inbox")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), id:doc.id 
                }));
                setMails(newData);                
                })
                setReaload(false);

            }catch (err) {
                console.error(err);
            }
        }

        getMails();

        return () => {
            isMounted = false;
        }

    }, [reload]);
    
    return (
        <article className="text-white">
            {mails?.length ? !mailToRead ? (
                        <div>
                            <h1 className={`${styles.heading2}`}>Posteingang</h1>
                            <table className="w-full border-collapse box-shadow-2 bg-primary rounded-2xl lg:table-fixed">
                                    <thead>
                                        <tr className="text-left bg-[#4F228D] rounded-2xl">
                                            <th className="p-5 rounded-tl-2xl">
                                                <span className="flex flex-col">
                                                    <span>Nutzername</span>
                                                    <span className="text-neutral-300">Email</span>
                                                </span>
                                            </th>
                                            <th className="p-4">Nachricht</th>
                                            <th className="p-4">Empfangen</th>
                                            <th className="p-4 rounded-tr-2xl text-center">Löschen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mails?.map((mail, i) => 
                                            <tr key={i} onClick={(e) => {setMailToRead(mail)}} className={`border-t-2 border-neutral-600 hover:bg-[#3d1870]`}>
                                                <td className={` p-4 ${i === mails?.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                                    <span className="flex flex-col">
                                                        <span className="pointer-events-none">{mail.userName}</span>
                                                        <span className=" text-neutral-400 pointer-events-non">{mail.userEmail}</span>
                                                    </span>
                                                </td>
                                                <td className={`p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs`}>{mail.userMessage}</td>
                                                <td className={`p-4`}>{mail.createDate}</td>
                                                <td className={` p-4 text-center ${i === mails?.length - 1 ? 'rounded-br-2xl' : ''}`}><FontAwesomeIcon onClick={(e) => {deleteMail(mail); e.stopPropagation()}} className="hover:cursor-pointer hover:text-red-600" icon={faTrashCan}/></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                
                        </div>
                    ) : <Outlet context={[mailToRead, setMailToRead]}/> : 
                    <p>No mails to display</p>
            }
        </article>
    )
}

export default Inbox