import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links';
import { useDispatch, useSelector } from 'react-redux';
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import {IoIosArrowDropdownCircle} from "react-icons/io"
import {apiConnector} from '../../services/apiconnector'
import { useState,useEffect } from 'react';
import {categoryEndpoints} from '../../services/apis';
import {logout} from "../../services/operations/authAPI" ;


const NavBar = () => { 
    const {token} = useSelector((state)=>(state.auth)) ;
    // const token = null ;
    const {user} = useSelector((state)=>(state.profile)) ;
    const {totalItems } = useSelector((state)=>(state.cart)) ;
    const [loading, setLoading] = useState(false)
    const location = useLocation() ;

    const [subLinks, setSubLinks]  = useState([]);

    // const fetchSublinks = async() => {
    //     try{
    //         const result = await apiConnector("GET", categoryEndpoints.SHOW_ALLCATEGORIES_API);
    //         console.log("Printing Sublinks result:" , result);
    //         setSubLinks(result.data.data);
            
    //     }
    //     catch(error) {
    //         console.log("Could not fetch the category list");
    //     }
    // }


    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try {
            const res = await apiConnector("GET", categoryEndpoints.SHOW_ALLCATEGORIES_API)
            console.log("RES :",res);
            setSubLinks(res.data.data) ;
            console.log("SUB-LINKS :",subLinks);
          } catch (error) {
            console.log("Could not fetch Categories.", error)
          }
          setLoading(false)
        })()
      }, [])

    const dispatch = useDispatch() ;
    // const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className='h-14 flex border-b-[1px] border-richblack-700 '>
            <div className='justify-between items-center w-11/12 flex mx-auto'>
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo" height={42} width={160} />
                    </Link>
                </div>
                <div>
                    <nav>
                        <ul className='flex gap-x-6 text-richblack-25'>
                            {
                                NavbarLinks.map((link, index) => (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                            <div className='flex gap-2 items-center relative group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdownCircle/>
                                                <div className='translate-x-[-80px] translate-y-[-10px] z-10 opacity-0 hover:opacity-100 transition-all duration-250'>
                                                    <div className='w-[20px] h-[20px] absolute translate-x-[54px] translate-y-[25px] bg-white rotate-45 rounded-sm'>
                                                        
                                                    </div>
                                                    <div className='w-[200px] h-auto z-10 absolute translate-y-[30px] translate-x-[-75px] bg-white rounded-sm text-richblack-800'>
                                                            {
                                                                subLinks.length > 0 ? (
                                                                        subLinks.map( (subLink, index) => (
                                                                            <Link to={`/catalog/${subLink.name
                                                                                    .split(" ")
                                                                                    .join("-")
                                                                                    .toLowerCase()}`} key={index}
                                                                                    // className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                                    >
                                                                                <p>{subLink.name}</p>
                                                                            </Link>
                                                                        ) )
                                                                ) : (<p className="text-center">No Courses Found</p>)
                                                            }
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        
                                            ) : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>

                <div className='flex gap-4'>
                    {
                       user && user?.accountType !== "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart>
                            {
                                totalItems>0 && (
                                    <div>
                                        {totalItems}
                                    </div>
                                )
                            }
                            </AiOutlineShoppingCart>
                        </Link>
                       ) 
                    }
                
                    {
                        token === null && (
                            <Link to="/login/">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <div className='relative'>
                                <ProfileDropDown />
                            </div>
                        )
                    }
                    {/* {
                        token !== null && (
                            <button onClick={()=>(dispatch(logout()))} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log Out
                            </button>
                        )
                    } */}
                </div>
                
            </div>
        </div>
    );
}

export default NavBar;
