import userResolvers from "./userResolvers";
import authResolvers from "./authResolvers";

const rootResolver = {
    ...userResolvers,
    ...authResolvers
};

export default rootResolver;
