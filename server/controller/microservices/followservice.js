const mongoose  = require("mongoose")
const {USER,CONNECT} = require("../../model/database")


async function Connection(req,res) {

    const req_Header = req.headers['x-action']

    const {followerId,followingId} = req.body
    if(!followerId || !followingId || !mongoose.Types.ObjectId.isValid(followerId) || !mongoose.Types.ObjectId.isValid(followingId) ) return res.status(400).json({msg:"In Valid User Id"})

    if(!req_Header) return res.status(400).json({msg:"No Connection Established "})
    
    
    try{
        if(followerId === followingId) return res.json({msg:'Cannot Follow yourself'})

        if(req_Header === 'follow'){
            await handlefollow(followerId,followingId);
            return res.status(200).json({msg:"Following Completed"})
        }
        else if( req_Header ==="unfollow"){
            await handleunfollow(followerId,followingId);
            return res.status(200).json({msg:'UnFollowed Completed'});
        }
        else return res.status(400).json({msg:'Invalid Header Action'})
    }catch(error){
        console.error("Connection Error :-  ",error);
        return res.status(500).json({msg:"Internal Server Error "})
    }
}

async function handlefollow(followerId,followingId) {

    // Start a session

    const session =await  mongoose.startSession();

    // Start transaction :- for all the transaction
    session.startTransaction();

    try{
        const doExist = CONNECT.findOne({follower:followerId,following:followingId}) ;
        if(doExist) throw new Error( "Already Following");
        await CONNECT.create([{
           follower : followerId,
           following: followingId, 
           }],{ session })  
        await USER.findByIdAndUpdate(followerId,
            {$inc:{follower : 1}},
            {session})
        await USER.findByIdAndUpdate(followingId,
            {$inc:{following:1}},
            {session})

        await session.commitTransaction();
    }catch(error){
        await session.abortTransaction();
        throw error;
    }finally{
        session.endSession();
    }  
}

async function handleunfollow(followerId, followingId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const doExist = await CONNECT.findOne({ follower: followerId, following: followingId }).session(session);
        if (!doExist) throw new Error("Not Following");

        await CONNECT.findOneAndDelete({ follower: followerId, following: followingId }).session(session);

        await USER.findByIdAndUpdate(followerId, { $inc: { following: -1 } }, { session });
        await USER.findByIdAndUpdate(followingId, { $inc: { follower: -1 } }, { session });

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}


module.exports ={ Connection };