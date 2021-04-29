import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import { CountdonwContext } from '../contexts/CountdonwContext';
import styles from '../styles/components/Countdonw.module.css'

export function Countdonw(){
    const {minutes,
            seconds,
            hasFinished,
            isActive,
            starCountdonw,
            resetCountdonw} = useContext(CountdonwContext);
    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    return(
        <div>   
            <div className={styles.countdonwContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>  
            </div>
            {hasFinished ?(
                <button 
                disabled
                className={styles.countdonwButton}
                >
                    Ciclo encerrado           
              </button>
            ) : (
                <>
                  { isActive ? (
                    <button type="button" 
                      className={`${styles.countdonwButton} ${styles.countdonwButtonActive}`} 
                      onClick={resetCountdonw}>
                          Abandonar ciclo            
                    </button>
                   ) : (            
                      <button type="button" 
                      className={styles.countdonwButton} 
                      onClick={starCountdonw}>
                          Iniciar um ciclo            
                      </button>
                   )}
                </>  
            )}

           
            </div>
    );
}