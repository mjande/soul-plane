import { useState, useEffect } from 'react';

export const preloadScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const preloadScreen = () => {
            setTimeout(() => {
                setIsLoading(false);
                sessionStorage.setItem('preload', 'isLoaded');
            }, 2000);
        };

        // Check whether 'preload' key is present in sessionStorage
        const isPreloaded = sessionStorage.getItem('preload') === 'isLoaded';
        !isPreloaded ? preloadScreen() : setIsLoading(false)

    }, []);
    return { isLoading }
}