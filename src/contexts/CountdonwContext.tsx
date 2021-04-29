import { createContext, ReactNode, useContext, useEffect, useState  } from "react";
import { ChallengesContext } from "./ChallengesContexts";

interface CountdondContextData{
    minutes:number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    starCountdonw:()=>void;
    resetCountdonw:()=>void;
}

interface CountdonwProviderProps{
    children: ReactNode;
}

let countdownTimeOut: NodeJS.Timeout;

export const CountdonwContext = createContext({} as CountdondContextData);

export function CountdonwProvider({ children }: CountdonwProviderProps){
    const { startNewChallenge }= useContext(ChallengesContext);
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function starCountdonw(){
        setIsActive(true);
    }

    function resetCountdonw(){
        clearTimeout(countdownTimeOut);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    useEffect(() => {
        window.onbeforeunload = () => {
          if (isActive) {
            return 'Você perderá o progresso do countdown até aqui, tem certeza?'
          }
        };
    }, [isActive])

    useEffect(()=> {
        if(isActive && time > 0){
            countdownTimeOut = setTimeout (()=> {
                setTime(time - 1);
            }, 1000)    
        }else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])
    
    return(
        <CountdonwContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            starCountdonw,
            resetCountdonw
        }}>
            { children }
        </CountdonwContext.Provider>
    )
}