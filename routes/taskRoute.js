const express = require("express");
const bodyParser = require("body-parser")

const taskModel = require("../models/taskModel")

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//1. POST

router.post("/", async (req, res) => {
                try {
                    //console.log(req.body);
                    const task = await taskModel.create({
                        id: Math.floor(Math.random()*100),
                        title:req.body.title,
                        is_completed: req.body.is_completed
                    });
                    res.status(201).json({
                        id : task.id
                    })
                }
                catch (e) {
                    res.status(500).json({
                        status: "Failed",
                        message: e.message
                    })
                }
            }) 


// 2. GET


router.get("/" , async (req , res)=> {
    try{
        const task = await taskModel.find();
        res.json({
            tasks: task
        })
    }
    catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})


// 3. GET (by particular id)


router.get("/:id" , async (req , res)=> {
    try{

        const task = await taskModel.findOne({id:req.params.id});
        
        if(task){
            res.json({
                id:task.id,
                title:task.title,
                is_completed:task.is_completed
            })
        }
        else{
            res.status(404).json({
                error: "There is no task at that id"
            })
        }

            
    }
    catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})


// 4. DELETE

router.delete("/:id", async (req, res) => {
                try {
                    
                    const taskDelete = await taskModel.deleteMany({ id: req.params.id });
                    res.status(204).json({
                        
                    })
                }
                catch (e) {
                    res.status(400).json({
                        status: "Failed",
                        message: e.message
                    })
                }
            })


// 5. UPDATE

   router.put("/:id", async (req, res) => {
                try {
                    //console.log(req.body);
                    const task = await taskModel.findOne({id:req.params.id});

                    if(task){
                        const taskUpdate = await taskModel.updateOne({id : req.params.id} , req.body);

                        res.status(204).json({
                            task : taskUpdate
                        })
                    }
                    else{
                        res.status(404).json({
                            error: "There is no task at that id"
                        })
                    }

                    
                }
                catch (e) {
                    res.status(400).json({
                        status: "Failed",
                        message: e.message
                    })
                }
            })

module.exports = router