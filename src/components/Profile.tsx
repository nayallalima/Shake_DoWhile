import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const {level}= useContext(ChallengesContext);
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/65499893?s=400&u=8a093657067275fe8ec1b335d54e28d0e9b9c723&v=4" alt="foto de perfil de Nayalla Lima"/>
            <div>
                <strong>  Nayalla Lima </strong>
                <p>Level {level}</p>
            </div>
        </div>
    );
}