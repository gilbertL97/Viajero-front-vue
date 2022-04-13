/**Generate by ASGENS
*@author Charlietyn 
*@date Sat Apr 02 17:07:38 CDT 2022  
*@time Sat Apr 02 17:07:38 CDT 2022  
*/
import * as utils from '@/helpers/helpers/utils'

const requireModule = require.context("@/", true, /(model.js$)/);
const regexp = new RegExp(/(\.\/|\.model.js)/g)
const classes = utils.dynamic_import(regexp, requireModule)

export function instance(class_name, attributes) {
    let class_instance = new classes[class_name].default(attributes)
    return utils.set_proxy(class_instance)
}

export function statics(class_name) {
    return classes[class_name].default
}

export default classes
