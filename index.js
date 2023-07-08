

const URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";




const getData =async(url)=>{
    try{
        const {data: results} = await axios.get(url) //promise is pending 
        // console.log(data); destructuring data for finding results from API
        return results;
    }

    catch(err){                           //promise is catching error
        return err;
    }
}

// getData(URL);                //above url is not cap
//the above is async so wait for the promise from API, below it will be made as promise

//finding quizes data:-

const getQuizes = async()=>{
    quizes =await getData(URL); 
}

getQuizes();  //now we're getting quiz data


//creating ques and options taking para as data from above

function createQuesAndOpt(quizes){





}



