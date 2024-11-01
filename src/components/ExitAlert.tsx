import { FocusContext, KeyPressDetails, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { FC, ReactNode, useEffect } from 'react';

interface ExitAlertProps {
    onConfirm: () => void;
    onCancel: () => void;
}

interface ButtonItemProps {
    focusKey: string;
    onEnterPress: (props: object, details: KeyPressDetails) => void;
    children: ReactNode;
}

const ButtonItem: FC<ButtonItemProps> = ({ focusKey, onEnterPress, children, ...props }) => {
    const { ref, focused } = useFocusable({
        onEnterPress,
        extraProps: {
            focusKey,
        },
    });

    return (
        <button
            ref={ref}
            className={`px-4 py-2 rounded-xl overflow-hidden ${focused ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            {...props}
        >
            {children}
        </button>
    );
};

const ExitAlert: FC<ExitAlertProps> = ({ onConfirm, onCancel }) => {
    const { ref, focusKey, focusSelf } = useFocusable({ focusKey: "EXIT" });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50" ref={ref}>
                <div className="bg-white shadow-lg p-6 w-96 rounded-3xl overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Are you sure you want to exit?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Any unsaved changes may be lost if you exit now.
                    </p>
                    <div className="flex justify-end space-x-4">
                        <ButtonItem focusKey='CANCEL' onEnterPress={onCancel}>
                            Cancel
                        </ButtonItem>
                        <ButtonItem focusKey='CANCEL' onEnterPress={onConfirm}>
                            Exit
                        </ButtonItem>
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
};

export default ExitAlert;