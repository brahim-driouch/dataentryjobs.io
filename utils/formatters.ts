  export const getUserNameInitials = (name:string)=>{
  const nameArray = name.split(" ")
  console.log(nameArray)
  const initals = `${nameArray[0][0]}${nameArray[1][0]}`
  return initals.toUpperCase()
  }