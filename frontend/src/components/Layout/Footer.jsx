import React, { useContext } from 'react'
import {Context} from "../../main"
import {Link} from "react-router-dom"
import { FaGithub , FaLinkedin} from "react-icons/fa"
function Footer() {
  const {isAuthorized}  = useContext(Context)
  return (
    <footer className= {isAuthorized ? "footerShow" : "footerHide"}>
<div>&copy; All Rights Reserved by Krish Dalsaniya.</div>
<div>
  <Link to={'https://github.com/Krish-Dalsaniya/'} target='github'><FaGithub></FaGithub></Link>
  <Link to={'https://www.linkedin.com/in/krish-dalsaniya-175b66344/'} target='linkedin'><FaLinkedin></FaLinkedin></Link>
</div>
      
    </footer>
  )
}

export default Footer