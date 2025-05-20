import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../style";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { faEdit, faAnglesUp, faAnglesDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Users = () => {
    const [users, setUsers] = useState();
    const [reload, setReaload] = useState(false);


    const degradeUser = async (id) => {
        try {

            await updateDoc(doc(db, "users", id), {
                userRole: 420
            });
            setReaload(true);

        }catch (err) {
            console.error(err);
        }
    }

    const upgradeUser = async (id) => {
        try {

            await updateDoc(doc(db, "users", id), {
                userRole: 187
            });
            setReaload(true);


        }catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                await getDocs(collection(db, "users")).then((querySnapshot)=>{               
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), id:doc.id
                }));

                setUsers(newData);                
                setReaload(false);
                })

            }catch (err) {
                console.error(err);
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }

    }, [reload]);

    if (!true) {
        return <h1>Loading</h1>;
    }



    return (
        <article className="text-white">
            {users
                    ? (  
                        <div>
                            <h1 className={`${styles.heading2}`}>Benutzer</h1>
                                <table className="w-full border-collapse box-shadow-2 bg-primary rounded-2xl">
                                    <thead>
                                        <tr className="text-left bg-[#4F228D] rounded-2xl">
                                            <th className="p-5 rounded-tl-2xl">Nutzername</th>
                                            <th className="p-5">Nutzerberechtigungen</th>
                                            <th className="p-5 rounded-tr-2xl">
                                                <span>
                                                    <FontAwesomeIcon icon={faEdit}/> Bearbeiten
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((user, i) => 
                                            <tr key={i} className={`border-t-2 border-neutral-600 hover:bg-[#3d1870]`}>
                                                <td className={` p-4 ${i === users?.length - 1 ? 'rounded-bl-2xl' : ''}`}>
                                                    <span className="flex flex-col">
                                                        <span className="pointer-events-none">{user.userName}</span>
                                                        <span className=" text-neutral-400">{user.userEmail}</span>
                                                    </span>
                                                </td>
                                                <td className={`p-5`}>{user.userRole}</td>
                                                <td className={`p-5 ${i === users?.length - 1 ? 'rounded-br-2xl' : ''}`}>
                                                    {user.userRole === 187 ? 
                                                        <button onClick={() => {degradeUser(user.id)}}><FontAwesomeIcon className="text-red-600" icon={faAnglesDown}/> Zum User degradieren</button> 
                                                        :
                                                        <button onClick={() => {upgradeUser(user.id)}}><FontAwesomeIcon className=" text-lime-600" icon={faAnglesUp}/> Zum Admin befördern</button>
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                
                            </div>
                    ) : <p>No users to display</p>
            }
        </article>
    )
}

export default Users