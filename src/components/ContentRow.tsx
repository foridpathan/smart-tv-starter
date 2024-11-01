import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useRef } from "react";
import Asset from "./Asset";

const assets = [
    {
        title: 'Asset 1',
        color: '#714ADD'
    },
    {
        title: 'Asset 2',
        color: '#AB8DFF'
    },
    {
        title: 'Asset 3',
        color: '#512EB0'
    },
    {
        title: 'Asset 4',
        color: '#714ADD'
    },
    {
        title: 'Asset 5',
        color: '#AB8DFF'
    },
    {
        title: 'Asset 6',
        color: '#512EB0'
    },
    {
        title: 'Asset 7',
        color: '#714ADD'
    },
    {
        title: 'Asset 8',
        color: '#AB8DFF'
    },
    {
        title: 'Asset 9',
        color: '#512EB0'
    }
];


const ContentRow = ({ title, onAssetPress, onFocus }) => {
    const { ref, focusKey } = useFocusable({
        onFocus
    });

    const scrollingRef = useRef(null);

    const onAssetFocus = useCallback(
        ({ x }: { x: number }) => {
            scrollingRef.current.scrollTo({
                left: x,
                behavior: 'smooth'
            });
        },
        [scrollingRef]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div
                ref={ref}
            >
                <div className="text-2xl font-medium text-white pb-4 ">{title}</div>
                <div className="overflow-x-auto overflow-y-hidden" ref={scrollingRef}>
                    <div className="flex gap-2">
                        {assets.map(({ title, color }) => (
                            <Asset
                                key={title}
                                title={title}
                                color={color}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    )
}

export default ContentRow