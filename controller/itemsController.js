const itemSchema =require('../modules/items.js')


const createItems=async(req,res)=>{
    const {name,email,mobile}=req.body
    try {
        if(!name || !email || !mobile){
            return res.status(201).send({
                success:false,
                message:"fill all the fields"
            })
        }
        if(name.length<5){
            return res.status(201).send({
                success:false,
                message:"name should be minimum 5 character"
            }) 
        }
        if(mobile.length!=10 ){
            return res.status(201).send({
                success:false,
                message:"enter 10 digits phone number"
            }) 
        }
    
        const exituser=await itemSchema.findOne({"$or":[{email:email},{mobile: mobile }]})
        if(exituser){
            return res.status(201).send({
                success:false,
                message:'this email or mobile number already available'
            })
        }
        const item=await new itemSchema({
            name,
            email,
            mobile
        }).save();
        return res.status(200).send({
            success:true,
            message:"created successfully ",
            item

        })
        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`this is server error ${error}`
        }) 
    }

}



const getItems=async(req,res)=>{
    try {
      
        const item=await itemSchema.find({})
        if(!item){
            return res.status(200).send({
                success:false,
                message:"no data available"
    
            })   
        }
        return res.status(200).send({
            success:true,
            data:item

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`this is server error ${error}`
        }) 
    }

}



const deleteItem=async(req,res)=>{
    const {name,email,mobile}=req.body
    try {
        const item=await itemSchema.findByIdAndDelete(req.params.id       
            );
          
          
             return res.status(200).send({
                success:true,
                message:"deleted successfully",
                
    
            })

        
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`this is delete server error ${error}`
        }) 
    }

}

const updateItem=async(req,res)=>{
    const {name,email,mobile}=req.body
    try {
        if(!name || !email || !mobile){
            return res.status(201).send({
                success:false,
                message:"fill all the fields"
            })
        }
        if(name.length<5){
            return res.status(201).send({
                success:false,
                message:"name should be minimum 5 character"
            }) 
        }
        if(mobile.length!=10 ){
            return res.status(201).send({
                success:false,
                message:"enter 10 digits phone number"
            }) 
        }
        const item=await itemSchema.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true}
            )
            return res.status(200).send({
                success:true,
                message:" successfully updated",
                item
    
            })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`this is upadte server error ${error}`
        }) 
    }
}

const getSingleItem=async(req,res)=>{
    const {name,email,mobile}=req.body
    try {
        const item=await itemSchema.findById(req.params.id,
           
            )
            return res.status(200).send({
                success:true,
                
                data:item
    
            })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:`this is upadte server error ${error}`
        }) 
    }
}

module.exports={getItems,createItems,updateItem,deleteItem,getSingleItem}