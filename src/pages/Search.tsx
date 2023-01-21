import React, { ChangeEvent, useEffect, useState } from "react"
import Detail from "../components/Detail"
import Toggle from "../components/UI/Toggle"

import { record, useSearchContext } from "../components/contexts/SearchProvider"
import useDebounce from "../components/hooks/useDebounce"

import style from "./Search.module.css"

function ResultItem(item: record) {
    const {openDetail} = useSearchContext()

    function handleClick() {
        openDetail(item)
    }

    return (
        <div className={style.item}>
            <img className={style.itemImage} alt={item.description || ""} src={item.thumbImgUrl} onClick={handleClick} />
            <div>{item.description}</div>
        </div>
    )
}

function Result() {
    const {dataset, prevPage, nextPage} = useSearchContext()

    if (dataset === undefined) {
        return <></>;
    }
    else if (dataset.length === 0) {
        return <div>No Match Found!</div>
    }

    return <div className={style.resultContainer }>
        <div className={style.resultBody}>
            {
                dataset.map(item => <ResultItem key={item.id} {...item} />)
            }
        </div>
        <div className={style.resultFooter}>
            <button onClick={prevPage}>Prev</button><button onClick={nextPage}>Next</button>
        </div>
    </div>
}

function Search() {
    const [theme, setTheme] = useState(true)
    const [searchTxt, setSearchTxt] = useState("")
    const debouncedSearchTxt = useDebounce(searchTxt, 1000)

    const { selectedItem, search, dataset} = useSearchContext()

    useEffect(() => {
        document.documentElement.setAttribute('color-scheme', (theme) ? "light":  "dark")
    }, [theme])

    useEffect(() => {
        search(debouncedSearchTxt)
    }, [debouncedSearchTxt, search])

    function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTxt(event.target.value)

    }

    return (
        <>
            { selectedItem && <Detail/> }
            <Toggle style={{float: "right", margin: "10px"}} value={theme} onToggle={setTheme}/>
            <div className={style.searchContainer}>
                <input type="text" className={style.searchText} placeholder="enter text to search"
                    value={searchTxt} onChange={handleQueryChange} 
                />
            
                <Result></Result>
            </div>
        </>
    )
}

export default Search