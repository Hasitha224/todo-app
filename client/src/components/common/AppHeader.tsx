import { Link } from "react-router-dom";

const AppHeader = () => {
    return (
        <header className="sticky top-0 z-50 w-full h-16 bg-primary border-b shadow-sm backdrop-blur-md flex items-center justify-center gap-5 px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg text-white shadow-md">
                <img
                src="/src/assets/logo.png" 
                alt="TODO App Logo"
                className="w-8 h-8 object-contain"
                />
            </div>
            <Link to="/" className="block">
                <h1 className="text-xl xl:text-3xl font-semibold tracking-tight text-white cursor-pointer">
                    TODO App
                </h1>
            </Link>
        </header>
    );
}

export default AppHeader
