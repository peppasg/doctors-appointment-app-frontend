const Header = () => {
    return (
        <>
            <header className="bg-gray-700 h-16 fixed w-full z-50">
                <div className="container mx-auto px-5 flex items-center justify-between">
                    <a className="flex" href="/">
                        <img
                            className="h-16 w-auto object-contain invert mix-blend-screen"
                            src="../../public/heart-pulse.svg"
                            alt="Doctors Logo"
                        />
                        <p className="py-5 text-white font-medium">Medical Appointment Application</p>
                    </a>
                    <nav className="flex gap-4 text-white">
                        <a href="/">Home</a>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;