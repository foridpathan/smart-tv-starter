import { FocusContext, setFocus, useFocusable } from "@noriginmedia/norigin-spatial-navigation";
import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menus = [
    { title: "Home", url: '/' },
    { title: "Movies", url: '/movies' },
    { title: "Series", url: '/series' },
    { title: "Sports", url: '/sports' },
];

const MenuItem = ({ menu, onEnterPress }) => {
    const location = useLocation()
    const { ref, focused } = useFocusable({
        onEnterPress,
        onArrowPress: (direction) => {
            if (direction === "right") {
                setFocus("CONTENT");
                return false
            }
        },
        extraProps: {
            ...menu
        }
    });

    return (
        <div ref={ref} className={`flex items-center rounded-2xl  px-4 py-2 border-2 ${focused ? 'border-red-400 text-red-400' : 'border-transparent'} ${location.pathname === menu.url ? 'text-red-400' : 'text-white'}`}>
            <Link to={menu.url}>
                {menu.title}
            </Link>
        </div>
    );
}


const Navbar = () => {
    const navigation = useNavigate()

    const { ref, hasFocusedChild, focusKey } = useFocusable({
        trackChildren: true,
        focusKey: 'MENU',
    });

    const mouseEnterEvent = () => {
        setFocus("MENU");
    };

    const mouseLeaveEvent = () => {
        setFocus("CONTENT");
    };

    const handleEnterPress = useCallback((menu) => {
        navigation(menu.url)
    }, [navigation]);


    return (
        <FocusContext.Provider value={focusKey}>
            <div className="">
                <div
                    className={`h-full bg-slate-900 py-4 px-2 flex items-center justify-center transition-all ${hasFocusedChild ? "w-48" : 'w-32'}`}
                    ref={ref}
                    onMouseEnter={mouseEnterEvent}
                    onMouseLeave={mouseLeaveEvent}
                >
                    <div className="text-left w-full space-y-4">
                        {
                            menus.map((menu) => (
                                <MenuItem key={menu.title} menu={menu} onEnterPress={handleEnterPress} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </FocusContext.Provider>
    );
};

export default Navbar;