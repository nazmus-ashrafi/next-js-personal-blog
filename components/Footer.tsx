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
                className="transition-transform hover:scale-110"
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


                {/* Github icon */}
                <a
                href="https://github.com/nazmus-ashrafi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
                aria-label="Github Profile"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="GitHub"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.606-2.665-.304-5.466-1.334-5.466-5.934 0-1.31.468-2.38 1.235-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.628-5.476 5.928.43.372.812 1.102.812 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                </a>


                {/* LinkedIn icon */}
                <a
                href="https://www.linkedin.com/in/nazmus-ashrafi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
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