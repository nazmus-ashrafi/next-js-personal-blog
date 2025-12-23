import Link from "next/link"
import SocialLinks from "@/components/SocialLinks"


const Footer = () => {
    return (

        <footer className="footer footer-horizontal footer-center bg-zinc-800 text-sky-200 rounded p-10 border-t border-zinc-700">

            <nav>
                <div className="grid grid-flow-col gap-4 items-center">
                    <SocialLinks />
                </div>
            </nav>
        </footer>

    )
}

export default Footer