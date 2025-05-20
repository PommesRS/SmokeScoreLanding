import React, {useEffect, useState} from 'react'
import styles from '../../style'
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Edit = () => {
    const [link1, setLink1] = useState(null);
    const [prevLink1, setPrevLink1] = useState(null);
    const [link2, setLink2] = useState(null);
    const [prevLink2, setPrevLink2] = useState(null);
    const [editLink1, setEditLink1] = useState(false);
    const [editLink2, setEditLink2] = useState(false);
    const [reload, setReaload] = useState(false);


    useEffect(() => {
        async function fetchData() {
            try {
                const Link1Ref = await getDoc(doc(db, 'SoundcloudLinks', 'Link1'))
                setPrevLink1(Link1Ref.data().link);
                const Link2Ref = await getDoc(doc(db, 'SoundcloudLinks', 'Link2'))
                setPrevLink2(Link2Ref.data().link);              
                
                setReaload(false);
            }catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [reload])

    const handleLink1Change = async (e) => {
        e.preventDefault();
        e.target.reset();
        await setDoc(doc(db, 'SoundcloudLinks', 'Link1'), {
            link: link1
        })
        setEditLink1(false);
        setReaload(true);

    }

    const handleLink2Change = async (e) => {
        e.preventDefault();
        e.target.reset();
        await setDoc(doc(db, 'SoundcloudLinks', 'Link2'), {
            link: link2
        })
        setEditLink2(false);
        setReaload(true);

    }


    return (
        <div className={`${styles.flexCenter} flex-col gap-5 text-white`}>
            <h1 className={`${styles.heading2} `}>Soundcloud Links bearbeiten</h1>

            {/* Link 1 */}
            <p >Link 1</p>
            <div className='w-full flex items-center gap-5'>
                <span className='text-neutral-500'>{prevLink1}</span> <button onClick={() => setEditLink1(prevState => !prevState)}><FontAwesomeIcon icon={faEdit}/>{editLink1 ? <> Abbrechen</> : <> Bearbeiten</> }</button>
            </div>
            <form className={` duration-75 ease-linear ${editLink1 ? 'w-full flex flex-row gap-3' : 'absolute -left-[9000rem]'}`} onSubmit={handleLink1Change}>
                <input onChange={(e) => setLink1(e.target.value)} placeholder='Neuer Link...' type="text" className='w-full rounded-lg text-black pl-2'/>
                <button type='submit' className='text-white bg-black-gradient p-3 rounded-lg flex items-center gap-2'>Absenden <FontAwesomeIcon className='text-lime-600' icon={faCheck}/></button>
            </form>

            {/* Link 2 */}
            <p className='border-t-[1px] border-white w-full text-center pt-3'>Link 2</p>
            <div className='w-full flex items-center gap-5'>
                <span className='text-neutral-500'>{prevLink2}</span> <button onClick={() => setEditLink2(prevState => !prevState)}><FontAwesomeIcon icon={faEdit}/> {editLink2 ? <> Abbrechen</> : <> Bearbeiten</> }</button>
            </div>
            <form className={editLink2 ? 'w-full flex flex-row gap-3' : 'absolute -left-[9000rem]'} onSubmit={handleLink2Change}>
                <input onChange={(e) => setLink2(e.target.value)} placeholder='Neuer Link...' type="text" className='w-full rounded-lg text-black pl-2'/>
                <button type='submit' className='text-white bg-black-gradient p-3 rounded-lg flex items-center gap-2'>Absenden <FontAwesomeIcon className='text-lime-600' icon={faCheck}/></button>
            </form>

        </div>
    )
}

export default Edit