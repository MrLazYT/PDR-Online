import { Link } from "react-router-dom";
import type { TopMenuProps } from "../props/topMenuProps";

export default function TopMenu({ topMenuItems = [], selectedItem }: TopMenuProps) {
    return (
        <ul className="top-menu">
            {topMenuItems.map((menuItem, index) => (
                <li key={index} className="menu-item">
                    <Link className={`link ${selectedItem == index ? "selected" : ""}`} to={menuItem.link}>
                        {menuItem.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
