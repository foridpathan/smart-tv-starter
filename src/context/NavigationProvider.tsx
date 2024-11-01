import { useHotkeys } from '@/hooks/useHotkeys';
import { setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { createContext, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationProviderContextType {
    isExitPopupOpen: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const NavigationContext = createContext<NavigationProviderContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [exit, setExit] = useState(false);

    // Register hotkeys
    useHotkeys([
        ['10009', () => handleBackNavigation()],
        ['461', () => handleBackNavigation()],
        ['GoBack', () => handleBackNavigation()],
        ['Escape', () => handleBackNavigation()],
        ['Backspace', () => handleBackNavigation()],
    ])

    // Handle back navigation based on current page and menu state
    const handleBackNavigation = useCallback(() => {
        if (location.pathname === '/') {
            setExit((prev) => !prev); // Toggle exit popup on home
            setFocus(exit ? 'CONTENT' : 'MENU');
        } else {
            navigate('/');
        }
    }, [location.pathname, exit, navigate]);

    const contextValue = useMemo(
        () => ({
            isExitPopupOpen: exit,
        }),
        [exit]
    );

    return (
        <NavigationContext.Provider value={contextValue}>
            {children}
        </NavigationContext.Provider>
    );
}