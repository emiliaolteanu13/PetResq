const convertPetType = (id : number) =>{
    switch(id){
        case(0):
            return "Cat";
        case(1):
            return "Dog";
        case(2):
            return "Alpaca";
        default:
            return "Other";
    }
}

const convertStatusType = (id : number) => {
    switch(id){
        case(0):
            return "Lost";
        case(1):
            return "Found";
        case(2):
            return "For Adoption";
        default:
            break;
    }
}

export {convertPetType, convertStatusType};