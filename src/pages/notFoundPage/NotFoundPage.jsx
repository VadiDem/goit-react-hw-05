import image from "../../img/not-found.png";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={css["container"]}>
      <p className={css["not-found-text"]}>Not found page</p>
      <img src={image} alt="" className={css["img"]} />
    </div>
  );
}