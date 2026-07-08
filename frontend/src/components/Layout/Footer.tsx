import React, { useContext } from 'react'
import { Context } from "../../Context"
import { Link } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa"

function Footer() {
  const { isAuthorized } = useContext(Context)
  
  if (!isAuthorized) return null;

  return (
    <footer className="glass border-t border-white/10 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-muted-foreground text-sm font-medium">
          &copy; All Rights Reserved by <span className="text-foreground">Krish Dalsaniya</span>.
        </div>
        <div className="flex items-center gap-6 text-xl text-muted-foreground">
          <Link to={'https://github.com/Krish-Dalsaniya/'} target='_blank' className="hover:text-primary hover:scale-110 transition-all">
            <FaGithub />
          </Link>
          <Link to={'https://www.linkedin.com/in/krish-dalsaniya-175b66344/'} target='_blank' className="hover:text-primary hover:scale-110 transition-all">
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
