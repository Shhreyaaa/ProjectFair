import commonApi from "./commonApi";
import SERVER_URL from "./serverUrl";

// register

export const registerApi=async(reqBody)=>{
   return await commonApi("POST",`${SERVER_URL}/register`,reqBody)
}

// login

export const loginApi=async(reqBody)=>{
   return await commonApi("POST",`${SERVER_URL}/login`,reqBody)

}

// add-project

export const addProjectApi=async(reqBody,reqHeader)=>{
   return await commonApi("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)

}

// get-home-projects

export const homeProjectApi=async()=>{
   return await commonApi("GET",`${SERVER_URL}/get-home-projects`,"")

}

// get-all-projects

export const allProjectApi=async(searchKey,reqHeader)=>{
   return await commonApi("GET",`${SERVER_URL}/get-all-projects?search=${searchKey}`,"",reqHeader)

}

// get-user-projects

export const userProjectApi=async(reqHeader)=>{
   return await commonApi("GET",`${SERVER_URL}/get-user-projects`,"",reqHeader)

}

// update-projects

export const updateProjectApi=async(pid,reqBody,reqHeader)=>{
   return await commonApi("PUT",`${SERVER_URL}/edit/projects/${pid}`,reqBody,reqHeader)

}

// delete-projects

export const deleteProjectApi=async(pid,reqHeader)=>{
   return await commonApi("DELETE",`${SERVER_URL}/delete/projects/${pid}`,{},reqHeader)

}

// update-profile

export const updateProfileApi=async(reqBody,reqHeader)=>{
   return await commonApi("PUT",`${SERVER_URL}/edit/profile`,reqBody,reqHeader)

}


