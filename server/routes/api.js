const   Transaction     = require("../model/Transaction"),
        express         = require("express"),
        router          = express.Router()

router.get("/transactions", async (req,res) =>{
    try{
        const transactions = await Transaction.find({})
        res.send(transactions)
    }
    catch(err){
        res.send(err)
    }
})
router.get("/transactions/bycategory", async (req,res) =>{
    try{
        const transactions = await Transaction.aggregate([
            {
                $group:
                {_id: "$category",
                totalTransactions: {$sum: `$amount`}}
            }
        ])
        res.send(transactions)
    }
    catch(err){
        res.send(err)
    }
})
router.post("/transactions", async (req,res) =>{
    try{
        const transactions = new Transaction(req.body)
        const savedTransaction = await transactions.save()
        res.send(savedTransaction)
    }
    catch(err){
        res.send(err)
    }
})
router.delete("/transactions/:id", async (req,res) =>{
    try{
        const id = req.params.id
        await Transaction.findByIdAndRemove(id)
        res.send()
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router 