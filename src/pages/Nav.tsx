import React from "react";

import style from "./Nav.module.css"

interface MenuProps {
    children: React.ReactNode
}
function MenuItem({children} : MenuProps) {
    return (<div className={style.menuItem}>{children}</div>)
}
function Nav() {
    return (
        <div className={style.menuContainer}>
            <MenuItem>menu 1</MenuItem>
            <MenuItem>menu 2</MenuItem>
            <MenuItem>menu 3</MenuItem>
        </div>
    )
}

export default Nav