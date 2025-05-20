import React, { useContext, useState, useEffect } from 'react'
import styles from '../../style'
import { AuthContext } from '../../auth'
import { faHandsClapping, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { db } from '../../firebase'
import { collection, doc, getDocs, getDoc, deleteDoc } from "firebase/firestore";

const Upload = () => {
    const { currentUser } = useContext(AuthContext);
    const [mails, setMails] = useState(null);
    const [reload, setReaload] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const getMails = async () => {
            try {  
                await getDocs(collection(db, "users", currentUser.uid, 'messages')).then((querySnapshot)=>{
                                
                    querySnapshot.docs.map(async (document) => {
                        console.log(document.id)
                        try {
                            const docRef = await getDoc(doc(db, 'inbox', document.id))
                            console.log(docRef.data())
                            setMails([...mails, docRef.data()])
                            
                        } catch (error) {
                            console.log(error)
                        }
                        
                    });            
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
    <div className=" w-full font-poppins mt-[5dvh]">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth} relative flex flex-col gap-10 h-full rounded-b-2xl text-white`}>
                    <div>
                        <h1 className={`${styles.heading2}`}>Hallo, {currentUser.displayName} <FontAwesomeIcon icon={faHandsClapping}/></h1>
                        <p className={`${styles.paragraph}`}>Hier siehst du Nachrichten die du bereits versendet hast und noch nicht vom Admin gelöscht wurden.</p>
                    </div>

                    <table className="w-full border-collapse box-shadow bg-primary rounded-2xl lg:table-fixed">
                        <thead>
                            <tr className="text-left bg-[#4F228D] rounded-2xl">
                                <th className="p-5 rounded-tl-2xl">Gesendet</th>
                                <th className="p-4 rounded-tr-2xl">Nachricht</th>
                            </tr>
                        </thead>
                        <tbody className='rounded-b-2xl'>
                            
                            
                            {mails != null ?
                                <>
                                {mails?.map((mail, i) => 
                                    <tr key={i} onClick={(e) => {}} className={`border-t-2 border-neutral-600 hover:bg-[#3d1870]`}>
                                        <td className={` p-4 ${i === mails?.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                            <span className="flex flex-col">
                                                <span className="pointer-events-none">{mail.userName}</span>
                                                <span className=" text-neutral-400 pointer-events-none">{mail.userEmail}</span>
                                            </span>
                                        </td>
                                        <td className={`p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs ${i === mails?.length - 1 ? 'rounded-br-2xl' : ''}`}>{mail.userMessage}</td>
                                    </tr>
                                )}</>
                                :
                                <tr className={`border-t-2 border-neutral-600 `}>
                                        <td className={` p-4 `}>
                                            <span className="flex flex-col">
                                                <span className="pointer-events-none">Keine Nachrichten</span>
                                                
                                            </span>
                                        </td>
                                        <td className={`p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-xs cursor-pointer`}><a href='#/contact'> Nachricht schreiben <FontAwesomeIcon icon={faArrowRight}/></a></td>
                                    </tr>
                                
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
  )
}

export default Upload