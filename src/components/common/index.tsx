import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {isMobile} from "../../recoil/DBAtom";

export const EnvObserver = () => {

    const [, setIsMobile] = useRecoilState(isMobile);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div></div>
    )
}