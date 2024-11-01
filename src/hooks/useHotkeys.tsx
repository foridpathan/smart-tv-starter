/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

export type MouseEventHandler = (event: MouseEvent) => void;
export type HotkeyHandler = () => void;
export type HotkeyItem = [string, HotkeyHandler];

export function useHotkeys(
    hotkeys: HotkeyItem[],
    mouseHandler?: string[] | string | any | undefined,
    interval?: (e: number) => void | undefined,
    condition: boolean = true
) {
    useEffect(() => {
        if (condition) {
            const keyMap: { [key: string]: HotkeyHandler } = {};
            hotkeys.forEach(([key, handler]) => {
                keyMap[key] = handler;
            });

            const hotkeyHandler = (event: KeyboardEvent) => {
                const inv = (
                    event.key === 'GoBack' ||
                    event.code === 'GoBack' ||
                    event.key === 'Backspace' ||
                    event.code === 'Backspace' ||
                    event.key === 'Escape' ||
                    event.code === 'Escape' ||
                    event.keyCode === 10009 ||
                    event.keyCode === 461
                );


                const hotkey = hotkeys.find(([key]) => (event.key === key || event.code === key || event.keyCode === parseInt(key)));

                if (hotkey) {
                    hotkey[1]();
                    if (!inv) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        interval && interval(Date.now())
                    }
                    event.preventDefault();
                }
            };

            (window as any).addEventListener('keydown', hotkeyHandler);

            return () => {
                (window as any).removeEventListener('keydown', hotkeyHandler);
            };
        }
    }, [hotkeys, mouseHandler, condition]);
}
