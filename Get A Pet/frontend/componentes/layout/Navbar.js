import {Link} from 'react-router.dom'

import Logo from '../../assets/img/logo.png';

import style from './layout/Navbar.module.css'

function Navbar() {
    return(
        <nav className={style.navbar}>
            <div className={style.navbar_logo}>
                <img src={Logo} alt='Logo' />
                <h2>Get a Pet</h2>
            </div>
            <lu>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Cadastrar</Link>
                </li>
            </lu>
        </nav>

        

    )
}

export default Navbar