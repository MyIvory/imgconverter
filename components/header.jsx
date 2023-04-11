import s from "../styles/headerModule/headerModule.module.css"
const Header =(props)=>{

return (
    <div className={s.main}>
        <div className={s.user}><span>User name</span> </div>
        <div className={s.tools}>
            <div className={s.read_button} onClick={props.handleUpload}>Read</div>
            <div className={s.counter} style={{fontSize:36}}>{props.counter}</div>
            <div className={s.save_button}>Save</div>
        </div>
        <div className={s.local}>
            <div>EN</div>
            <div>UA</div>
        </div>
    </div>
)
}
export default Header;