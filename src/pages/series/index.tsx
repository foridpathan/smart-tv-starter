import ContentRow from "@/components/ContentRow";
import SelectedRow from "@/components/SelectedRow";
import { FocusContext, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback, useEffect, useState } from "react";


const rows = [
    {
        title: 'Series'
    },
];


const Series = () => {
    const { ref, focusKey, focusSelf } = useFocusable({ focusKey: "CONTENT" });
    const [selectedAsset, setSelectedAsset] = useState(null);
    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    const onAssetPress = useCallback((asset) => {
        setSelectedAsset(asset);
    }, []);

    const onRowFocus = useCallback(
        ({ y }: { y: number }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        },
        [ref]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div className="flex flex-col h-full w-full">
                <SelectedRow selectedAsset={selectedAsset} />
                <div className="overflow-y-auto flex-1" ref={ref}>
                    <div className="space-y-5">
                        {rows.map(({ title }) => (
                            <ContentRow
                                key={title}
                                title={title}
                                onAssetPress={onAssetPress}
                                onFocus={onRowFocus}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
};

export default Series;