// import s from "../styles/headerModule/headerModule.module.css"

// const Header =(props)=>{

//     console.log(t)
// return (
//     <div className={s.main}>
//         <div className={s.user}><span>{t("user")}</span> </div>
//         <div className={s.tools}>
//             <div className={s.read_button} id="read_button" onClick={props.handleUpload}>Read</div>
//             <div className={s.counter}>{props.display}</div>
//             <div className={s.save_button}>Save</div>
//         </div>
//         <div className={s.local}>
//             <div>EN</div>
//             <div>UA</div>
//         </div>
//     </div>
// )
// }
// export default Header;
import Link from "next/link";
import s from "../styles/headerModule/headerModule.module.css";

const Header = (props) => {

  return (
    <div className={s.main}>
      <div className={s.user}>
        <span>user</span>
      </div>
      <div className={s.tools}>
        <div
          className={s.read_button}
          id="read_button"
          onClick={props.handleUpload}
        >
          Read
        </div>
        <div className={s.counter}>{props.display}</div>
        <div className={s.save_button}>Save</div>
      </div>
      <div className={s.local}>
        <div>
          <Link href="/" locale="en" legacyBehavior>
            <a className={s.locale}>English</a>
          </Link>
          <Link href="/" locale="uk" legacyBehavior>
            <a className={s.locale}>Japanese</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
