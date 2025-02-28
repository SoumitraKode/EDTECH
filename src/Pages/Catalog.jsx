import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from "../components/common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
// import apiConnector  from "./../services/apiconnector" ;apConnector
import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"
import { categoryEndpoints } from "../services/apis"
// import { apiConnector } from "../services/apiConnector"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categoryEndpoints.SHOW_ALLCATEGORIES_API);
        // console.log("Show all categories:", res);

        // Ensure response structure is valid
        if (!res?.data?.data) {
          console.error("Invalid response structure:", res);
          return;
        }

        // Extract categories
        const categories = res.data.data;

        // Find the category matching `catalogName`
        const matchedCategory = categories.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );
        // Check if category exists before accessing `_id`
        if (!matchedCategory) {
          console.error("No matching category found for:", catalogName);
          return;
        }

        const category_id = matchedCategory._id;
        setCategoryId(category_id);
        console.log("CategoryId:", category_id);
        // const category_id = res?.data?.data?.filter(
        //   (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        // )[0]._id
        // setCategoryId(category_id) ;
        // console.log("CategoryId",category_id) ;
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])
  useEffect(() => {
    if (categoryId) {
      ;(async () => {
        try {
          console.log("categoryId",categoryId) ;
          const res = await getCatalogPageData(categoryId)
          setCatalogPageData(res) ;
          console.log("Result getCatalogPageData :",res) ;
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex ~min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="text-center text-white text-4xl font-semibold mt-8 ">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4  lg:max-w-maxContent">
      <h1 className="text-center text-white text-4xl font-semibold mt-8">
          Frequently Brought
        </h1>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
