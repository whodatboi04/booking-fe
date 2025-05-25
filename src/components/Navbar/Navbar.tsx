import { HashLink } from 'react-router-hash-link';
import { Navlinks } from './Navlinks'
import Logo from '@/assets/images/infinity.png'
import { PrimaryButton } from '../Buttons/Button';

const NavItems = () => {
    return (
        <ul className='flex gap-20'>
            {Navlinks.map((item) => (
                <li key={item.id}>
                    <HashLink
                        to={item.href}
                        className=" text-white hover:text-gray-300 transition duration-300 ease-in-out "
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
        <header className='flex justify-between items-center p-4'>
            <img src={Logo} alt="Logo" className='w-24'/>
            <nav>
                <NavItems />
            </nav>
            <div className=''>
                <PrimaryButton>Book Now</PrimaryButton>
            </div>
        </header>
    )
}

export default Navbar
