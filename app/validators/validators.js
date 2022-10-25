export const validateUserName = (name) => {
    if(name.trim() !== "" ) {
        return true;
    }

    return false;
};