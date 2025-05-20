import React from 'react'
import styles from "../../style";
import { getAnalytics, logEvent } from 'firebase/analytics';

const TestSection = () => {

    const analytics = getAnalytics();

    return (
        <div className=' text-white'>
            <h1 className={`${styles.heading2}`}>Test Section</h1>
            <button className=' border-[#4F228D] border-4 p-2 rounded-lg bg-black-gradient-2' onClick={() => {
                logEvent(analytics, 'notification_received');
                console.log(analytics)
                }}>arsch</button>
        </div>
        
    )
}

export default TestSection