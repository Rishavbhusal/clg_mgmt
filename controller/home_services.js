const model = require("../models")

const getHomeItems = async()=>{
const result = await model.Home.findAll({
    raw:true
    
})

return result
}
module.exports ={
    getHomeItems:getHomeItems
}