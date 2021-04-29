import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountdonwContext } from '../contexts/CountdonwContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenges, resetChallenge, completeChallenge}= useContext(ChallengesContext);
    const {resetCountdonw} = useContext(CountdonwContext);

    function handleClallengeSucceeded(){
        completeChallenge();
        resetCountdonw();
    }
    function handleClallengeFail(){
        resetChallenge();
        resetCountdonw();
    }
    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenges ? (
                <div className={styles.challengeActive}>
                    <header>
                        Ganhe {activeChallenges.amount}xp
                    </header>
                    <main>
                        <img src={`icons/${activeChallenges.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenges.description}</p>
                    </main>
                    <footer>
                        <button
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleClallengeSucceeded}
                        >Falhei
                        </button>
                        <button
                        type="button"
                        className={styles.challengeSucceedButton}
                        onClick={handleClallengeSucceeded}
                        >
                        Completei
                        </button>
                    </footer>
                </div>
            ):(
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}  
        </div>
    );
}