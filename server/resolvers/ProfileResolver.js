const { UserModel } = require("../models/User");


const profileResolvers = {
    Query : {
        getAllProfiles : async (parent, args) => {
            const { orderBy, searchString, rows, page } = args;
            console.log(rows+" "+page);
            
            let search = {};
            if(searchString)
                search = { first_name: { $regex: searchString, $options: 'i' } }
            
            const sort = {[orderBy.key] : (orderBy.sort === "asc") ? 1 : -1};
            
            const size = await UserModel.find(search).count();
            const profiles = await UserModel.find(search).skip(rows * page).limit(rows).sort(sort);
            // .sort(sort);
            console.log(size);
            console.log(profiles);
            return {
                size,
                profiles
            }
        },

        getProfileById : async (_, {id}) => {
            const profile = await UserModel.findOne({_id : id});
            if(!profile)
                throw new Error("Profile Not Found");
            console.log(profile);
            return profile;
        }
    },
    Mutation : {
        createProfile : async (_, {first_name, last_name, email, is_verified, image_url, description}) => {

            if(!(first_name && last_name && email && image_url && description))
                throw new Error("All Fields are Required");

            const isExist = await UserModel.findOne({email:email})
            console.log(isExist);
            if(isExist)
                throw new Error("User already exists with this Email");

            const user = new UserModel({first_name, last_name, email, is_verified, image_url, description});
            const profile  = await user.save();
            console.log(profile);
            return profile;
        },

        updateProfile : async (_, {id, first_name, last_name, email, is_verified, image_url, description}) => {
            if(!(first_name && last_name && email && image_url && description))
                throw new Error("All Fields are Required");
            const isExist = await UserModel.findOne({_id:id})
            if(!isExist)
                throw new Error("Profile Not Found");
            const user = { first_name, last_name, email, is_verified, image_url, description };
            const updatedProfile = await UserModel.findOneAndUpdate({_id: id}, user, {new: true});
            console.log(updatedProfile);
            return updatedProfile;
        },

        deleteProfile : async(_, {id}) => {
            console.log(id);
            const isExist = await UserModel.findOne({_id:id})
            console.log(isExist);
            if(!isExist)
                throw new Error("Profile Not Found");

            const isDeleted =  await UserModel.findByIdAndDelete({_id : id});
            if(isDeleted) 
                return "Profile Deleted";
            else
                return "Problem in Profile Deletion";
        }
    }
}

module.exports = {
    profileResolvers
}
