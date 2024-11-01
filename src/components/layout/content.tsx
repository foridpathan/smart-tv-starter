import { Outlet } from "react-router-dom";

const MainWrapper = () => {
    return (
        <div className="bg-slate-800 flex-grow-0 p-8 overflow-hidden">
            <Outlet />
        </div>
    );
};

export default MainWrapper;