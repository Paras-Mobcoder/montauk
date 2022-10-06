export default (()=>{
    const api = process.env.REACT_APP_API_URL
    // get all items
    return{
        getAllItems: `${api}v1/foods/list`,
        getBySearch: `${api}v1/foods/search`
    }
})()