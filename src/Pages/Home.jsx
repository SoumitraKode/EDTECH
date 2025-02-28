import React from 'react'
import { Link } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import HighlighText from "../components/core/HomePage/HighlighText";
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Skills from "../components/core/HomePage/Skills";
import logo1 from "../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../assets/TimeLineLogo/Logo4.svg";

import TimelineRightSubpart from '../components/core/HomePage/TimelineRightSubpart';
import Features from "../components/core/HomePage/Features";
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Explore from "../components/core/HomePage/Explore";
import ReviewSlider from "../components/common/ReviewSlider"
const Home = () => {
    return (
        <div>
            <div>
                {/* Section 1 */}
                <div>
                    <div className='flex flex-col items-center mx-auto justify-between w-11/12 relative text-white'>
                        <Link to={"/signup"}>
                            <div className='mx-auto rounded-full  font-bold bg-richblack-800 text-richblack-200
                    transition-all duration-200 hover:scale-95 my-7'>
                                <div className='flex flex-row px-10 py-1 gap-2  items-center transition-all duration-200 hover:bg-richblack-900'>
                                    <p>Become an Instructor</p>
                                    <GoArrowRight />
                                </div>
                            </div>
                        </Link>

                        <div className='text-center text-4xl font-semibold'>
                            Empower Your Future with
                            <HighlighText text={"Coding Skills"} />
                        </div>

                        <div className='mx-auto  max-w-4xl  font-medium leading-6 mt-6 text-center text-richblack-300 bg-gradient-to-r from-#1FA2FF via-#12D8FA to-#A6FFCB'>
                            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                        </div>

                        <div className='flex flex-row gap-7 mt-8 '>
                            <CTAButton active={true} tolink={"/signup"}>
                                Learn More
                            </CTAButton>
                            <CTAButton active={false} tolink={"/login"}>
                                Book a Demo
                            </CTAButton>
                        </div>

                        <div className='mx-auto my-[60px] w-4/5 shadow bannershadow'>
                            <video muted loop autoPlay src={Banner}>

                            </video>
                        </div>

                        <div><CodeBlocks
                            position={"flex-row"}
                            heading={
                                <div className='text-4xl font-semibold'>
                                    Unlock Your
                                    <HighlighText text={" coding Potentail "}></HighlighText>
                                    with our online courses
                                </div>
                            }
                            SubHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            btn1={
                                {
                                    children: "Try it Yourself", active: true, tolink: "/signup"
                                }
                            }
                            btn2={
                                {
                                    children: "Learn More", active: false, tolink: "/login",
                                }
                            }
                            codeblock={
                                `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav`
                            }
                            codeColour={"text-yellow-25"}
                            bgGradient={"gradient-to-r from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]"}
                        ></CodeBlocks>


                        </div>

                        <div className='relative'><CodeBlocks
                            position={"flex-row-reverse"}
                            heading={
                                <div className='text-4xl font-semibold'>
                                    Start
                                    <HighlighText text={" coding in seconds "}></HighlighText>

                                </div>
                            }
                            SubHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            btn1={
                                {
                                    children: "Continue Lesson", active: true, tolink: "/signup"
                                }
                            }
                            btn2={
                                {
                                    children: "Learn More", active: false, tolink: "/login",
                                }
                            }
                            codeblock={
                                `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav`
                            }
                            codeColour={"text-yellow-25"}
                            bgGradient={"gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}
                        ></CodeBlocks>
                            <div className='w-4/5 h-4/5 rounded-full bg-' >

                            </div>

                        </div>

                        <div>
                            <Explore/>
                        </div>
                    </div>
                </div>
                {/* Section 2 */}
                <div className='bg-rombhuspattern h-[290px] w-[100%] flex flex-col bg-[#F9F9F9]'>
                    <div className='my-14'></div>
                    <div className='w-11/12 flex justify-center items-center mx-auto gap-10 '>
                        <CTAButton active={true} tolink={"/catlogs"}>
                            <div className='flex justify-center items-center gap-1'>Explore Full Catlog <GoArrowRight /></div>
                        </CTAButton>
                        <CTAButton active={false} tolink={"/signin"}>Learn More</CTAButton>
                    </div>
                </div>

                <div className='w-screen bg-[#F9F9F9] font-inter'>

                    <div className='flex flex-col items-center w-11/12 mx-auto'>

                        <div className='my-10 flex flex-row mx-auto justify-between items-center font-semibold font-inter h-[144px] w-11/12 max-w-maxContent gap-4'>
                            <div className='w-[50%] text-4xl leading-10 mx-7'>Get the skills you need for a <HighlighText text={"job that is in demand"}></HighlighText></div>
                            <div className='w-[50%] flex flex-col gap-5'>
                                <div className='font-medium'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                                <div>
                                    <div className='w-[30%]'>
                                        <CTAButton active={true} tolink={"/signin"}>Learn more</CTAButton>
                                    </div>
                                    <div ></div>
                                </div>
                            </div>
                        </div>

                        <div className='flex  justify-between items-center my-10'>
                            <div className='font-inter flex-col flex w-[40%] justify-evenly'>
                                <Skills SkillsImg={logo1} SkillsHeading={"Ledership"} SkillsSubHeading={"Fully committed to the success company"} position={"First"}></Skills>
                                <Skills SkillsImg={logo2} SkillsHeading={"Responsibility"} SkillsSubHeading={"Students will always be our top priority"} position={"First"}></Skills>
                                <Skills SkillsImg={logo3} SkillsHeading={"Flexibility"} SkillsSubHeading={"The ability to switch is an important skills"} position={"First"} ></Skills>
                                <Skills SkillsImg={logo4} SkillsHeading={"Solve the problem"} SkillsSubHeading={"Code your way to a solution"} position={"Last"}></Skills>
                            </div>

                            <div>
                                <TimelineRightSubpart />
                            </div>
                        </div>

                        {/* Features Sub-Section */}
                        <div className='my-[130px]'>
                            <Features />
                        </div>
                    </div>
                </div>
                {/* Section 3 */}
                <div className='w-screen bg-richblack-900'>
                    <div className='w-11/12'>
                        <InstructorSection />
                    </div>
                </div>
                {/* Reviews Section */}
                  
                    <div className=" mx-auto my-20  w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                    {/* Reviws from Other Learner */}
                    <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                    </h1>
                    {/* <ReviewSlider /> */}
                    <ReviewSlider></ReviewSlider>   
                    </div>
                <div>
                    
                </div>

                {/* Footer */}
                <div>
                    {/* Left-footer */}
                    <div>
                        <div>
                            {/* Col-1 */}

                        </div>
                        <div>
                            {/* Col-2 */}
                        </div>
                        <div>
                            {/* Col-3 */}
                        </div>

                    </div>
                    <div>
                        {/* line */}
                    </div>
                    {/* Right-footer */}
                    <div>
                        <div>
                            {/* Col-1 */}
                        </div>
                        <div>
                            {/* Col-2 */}
                        </div>
                        <div>
                            {/* Col-3 */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
