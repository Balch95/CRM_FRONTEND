export const testPermission = (reqPerm) =>{  
    let permissionList = JSON.parse(localStorage.getItem("userPermission"))
    if(permissionList.includes(`${reqPerm}`)) return true;
}
