import MainWrapper from "./content";
import Navbar from "./navbar";

const Layout = () => {
    return (
        <div className='flex flex-row h-screen overflow-hidden'>
            <Navbar />
            <MainWrapper />
        </div>
    );
};

export default Layout;