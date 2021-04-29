import React, { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description:string;
    amount:number;
}
interface ChallengesContextData{
    level:number;
    currentExperience:number;
    experenceToNextLevel:number;
    challengesCompleted:number;
    activeChallenges: Challenge;
    levelUp:()=>void;
    startNewChallenge:()=>void;
    resetChallenge:()=>void;
    completeChallenge:()=>void;
    closedLevelUpModal:()=>void;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps{
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenges, setActiveChallenges] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experenceToNextLevel = Math.pow((level + 1) * 4, 2);
    
    useEffect(()=> {
        Notification.requestPermission();
    }, [])

    useEffect(()=> {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
       
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closedLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }
    
    function startNewChallenge(){
        const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randonChallengeIndex]; 

        setActiveChallenges(challenge)

        new Audio('/notification.mp3').play();
        if(Notification.permission === 'granted'){
            new Notification('Novo desafio \u{1F389}',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenges(null);
    }

    function completeChallenge(){
        if(!activeChallenges){
            return;
        }
        const { amount } = activeChallenges;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experenceToNextLevel){
            finalExperience = finalExperience - experenceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenges(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return(
    <ChallengesContext.Provider 
    value={{ 
    level, 
    currentExperience, 
    experenceToNextLevel,
    challengesCompleted,
    levelUp,
    startNewChallenge,
    activeChallenges,
    resetChallenge,
    completeChallenge,
    closedLevelUpModal    
    }}>
        { children }
        { isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
    )
    
}

    