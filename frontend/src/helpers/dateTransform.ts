 const dateTransform = (time : Date) => {




    time = new Date(time);

    let mounth = time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1

    return `${time.getDate()}.${mounth}.${time.getFullYear()}`
  }  


  export default dateTransform;