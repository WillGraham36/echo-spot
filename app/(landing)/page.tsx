import Header from "./_components/Header"
import Footer from "./_components/Footer"

const LandingPage = () => {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1">
                <Header />
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage