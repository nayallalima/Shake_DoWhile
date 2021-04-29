import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperenceBar.module.css'

export function ExperenceBar(){
    const { currentExperience, experenceToNextLevel }= useContext(ChallengesContext);
    
    const percentToNextLevel = Math.round(currentExperience * 100) / experenceToNextLevel;
    return(
        <header className={styles.experenceBar}>
            <span>0 xp</span>
            <div>
                <div style={{  width: `${percentToNextLevel}%` }}/> 
                <span className={styles.currentExperence} style={{  left: `${percentToNextLevel}%` }}>
                { currentExperience } px
                    </span>              
            </div>
            <span>{experenceToNextLevel } xp</span>
        </header>
    );
}