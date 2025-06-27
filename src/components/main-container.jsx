import { memo, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";

/**
 * MainContainer component that wraps the main content and handles layout for auth and main pages.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
const MainContainer = memo(({ children }) => {
    const location = useLocation();
    
    const isAuthPage = useMemo(() => {
        return location.pathname === '/sign-in' || location.pathname === '/sign-up';
    }, [location.pathname]);

    const mainContent = useMemo(() => {
        if (isAuthPage) {
            return (
                <main>
                    <div className='auth'>
                        {children}
                    </div>
                </main>
            );
        }

    return (
            <div>
                    <Navbar />
                    <main>
                        <div className='main-container'>
                            {children}
                        </div>
                    </main>
                </div>
        );
    }, [isAuthPage, children]);

    return mainContent;
});

// Add display name for better debugging
MainContainer.displayName = 'MainContainer';

export default MainContainer;