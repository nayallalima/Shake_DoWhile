import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const { level, closedLevelUpModal } = useContext(ChallengesContext);
    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{ level }</header>

                <strong>Parabens</strong>

                <p>Você alcançou um novo nível.</p>

                <button type="button"
                onClick={closedLevelUpModal}>
                    <img src="/icons/close.svg" alt="fechar modal"/>
                </button>

            </div>
        </div>
    )
}