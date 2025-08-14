import Link from "next/link"


const Footer = () => {
  return (

      <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
        
        <nav>
            <div className="grid grid-flow-col gap-4 items-center">
                

                {/* YouTube/Video icon */}
                <a

                href="https://www.youtube.com/@codingwithnazmus" 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 text-primary"
                aria-label="YouTube Channel"
                
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="fill-current w-6 h-6"
                >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                </a>


                {/* LinkedIn with correct LinkedIn SVG */}
                <a
                href="https://www.linkedin.com/in/nazmus-ashrafi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110 text-primary"
                aria-label="LinkedIn Profile"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                </svg>
                </a>

                
            </div>
        </nav>
    </footer>

  )
}

export default Footer