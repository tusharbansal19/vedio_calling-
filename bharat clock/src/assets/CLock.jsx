function CLock(){
    let date=new Date();
    let x=date.date.getHours();
    let y=date.getMinutes();
    let z=date.getSeconds();
    // setInterval(()=>{
    //     x=date.date.getHours();
    // y=date.getMinutes();
    //  z=date.getSeconds();
    // },1000);
    return <div className="container">
        <h2>HOURS :-{x} MINUTES :-{y} SECONDS:-{z}</h2>
    </div>
}
export default CLock;