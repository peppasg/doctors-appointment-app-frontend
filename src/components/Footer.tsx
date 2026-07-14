const Footer = () => {
    const currentYear: number = new Date().getFullYear();
    return (
        <>
            <footer className="bg-gray-700 text-white font-medium">
                <div className="container mx-auto py-6 text-center">
                    &copy; {currentYear} Coding Factory 9. All Rights reserved.
                </div>
            </footer>
        </>
    )
}
export default Footer;