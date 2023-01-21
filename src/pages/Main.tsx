import React from "react"

import style from "./Main.module.css"
import Nav from "./Nav"
import Search from "./Search"

function Main() {
    return (
        <>
            <div className={style.navContainer}>
                <Nav />
            </div>
            <div className={style.bodyContainer}>
                <Search />
            </div>
        </>
    )
}

export default Main