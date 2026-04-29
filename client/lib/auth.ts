//for storing the accessToken 
let accessToken=""
 //for gettting access token globally from import 

export const setAccessToken=(token:string)=>
 {
    accessToken=token
}
export const getAccessToken = () => {
  return accessToken
}

// //here everyrequest to the backend will go from here while checking for the expire access token 
// export const fetchWithAuth=async(url: string, options: RequestInit = {})=>
// {
//     let res=await fetch(url,{
//         ...options,
//         headers:{
//             ...options.headers,
//             Authorization:`Bearer ${accessToken}`,

//         },
//         credentials:"include"
//     });
//     //if it throws error understand that the accessToken is expired
//     if(res.status===401)
//     {
//         const refresh=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refreshToken`!,{
//             method:"POST",
//             credentials:"include",
//         });
//         if(!refresh.ok)
//         {
//             window.location.href='/login'
//             return res
//         }
//         const data=await refresh.json();
//         accessToken=data.accessToken
//     }
//       //here after sucessfully taking the access token we again fetch the req that was not done
//       res=await fetch(url,{
//         ...options,
//         headers:{
//             ...options.headers,
//             Authorization:`Bearer ${accessToken}`,
//         },
//         credentials:"include"
//       })
//       return res
// };

