import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

const Asset = ({ title, color, onEnterPress, onFocus }) => {
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        extraProps: {
            title,
            color
        }
    });
    return (
        <div
            ref={ref}
            className={`flex flex-col gap-2`}
        >
            <div className={`w-72 h-40 border-8 ${focused ? 'border-white' : 'border-transparent'} rounded-2xl`}
                style={{
                    background: color
                }}></div>
            <div className="text-sm font-medium text-white">{title}</div>
        </div>
    )
}
export default Asset