import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { catalogData,categoryEndpoints } from "../apis"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      categoryEndpoints.GET_CATEGORYPAGEDETAILS_API,
      {
        categoryId: categoryId,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Catagory page data.")
    }
    result = response?.data
    
  } catch (error) {
    console.log("CATALOGPAGEDATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}
