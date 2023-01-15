const testPermison = (reqPerm) =>{  
    let permissionList = JSON.parse(localStorage.getItem("userPermission"))
    if(permissionList.includes(`${reqPerm}`)) return true;
}
module.exports = {
    test: testPermison
}