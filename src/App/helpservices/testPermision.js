export const testPermission = (reqPerm) => {
    if (localStorage.getItem("userPermission")) {
        let permissionList = JSON.parse(localStorage.getItem("userPermission"))
        if (permissionList.includes(`${reqPerm}`)) return true;
    } else{
        return false;
    }
}
