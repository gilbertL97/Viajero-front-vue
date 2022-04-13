/**Generate by ASGENS
*@author Charlietyn 
*@date Sat Apr 02 17:07:38 CDT 2022  
*@time Sat Apr 02 17:07:38 CDT 2022  
*/
const requireModule = require.context("@/", true, /(route.js$)/);
let router_array = []
requireModule.keys().forEach((fileName, index) => {
        const elem = {...requireModule(fileName)}
        router_array=router_array.concat(...Object.values(elem))
    }
)
export default router_array;
