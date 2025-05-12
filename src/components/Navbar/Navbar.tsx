import { HashLink } from 'react-router-hash-link';
import { Navlinks } from './Navlinks'
import Logo from '@/assets/images/infinity.png'

const NavItems = () => {
    return (
        <ul className='flex gap-4'>
            {Navlinks.map((item) => (
                <li key={item.id}>
                    <HashLink
                  
                        to={item.href}
                        className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
                    >
                        {item.title}
                    </HashLink>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    return ( 
        <header className='border-2 flex justify-between items-center p-4 '>
            <img src={Logo} alt="Logo" className='border-2 w-24'/>
            <nav>
                <img src="" alt="" />
                <NavItems />
            </nav>
            <div className='border-2'>
                <a href="" className='text-white'>Book Now</a>
            </div>
        </header>
    )
}

export default Navbar
