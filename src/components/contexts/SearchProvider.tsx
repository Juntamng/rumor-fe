import React, { useContext, useEffect , useState, useCallback } from "react"

import axios from "axios"
// import { createApi } from "unsplash-js";
// import { createClient } from 'pexels';

// type Photo = {
//     id: number;
//     width: number;
//     height: number;
//     urls: { large: string; regular: string; raw: string; small: string };
//     color: string | null;
//     user: {
//       username: string;
//       name: string;
//     };
//   };

export interface record {
    id: string,
    description: string | null,
    thumbImgUrl: string,
    regularImgUrl: string
}

interface SearchContextData {
    dataset: record[] | undefined,
    page: number,
    query: string,
    search: (query: string) => void,
    nextPage: () => void,
    prevPage: () => void,
    openDetail: (item: record) => void,
    closeDetail: () => void,
    selectedItem: record | null,
}

interface SearchProviderProps {
    children: React.ReactNode
  } 

export const SearchContext = React.createContext<SearchContextData | undefined>(undefined)

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [data, setData] = useState<record[]>()
    const [dataset, setDataset] = useState<record[]>()
    const [query, setQurery] = useState<string>("")
    const [page, setPage] = useState(1)
    const [selectedItem, setSelectedItem] = useState<record | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async () => {
        setIsLoading(true)

        // const client = createClient('key');
        // const query = 'Nature';

        // client.photos.search({ query, per_page: 1 }).then(photos => {
        // debugger
        // });
        
        // const api = createApi({
        //     // Don't forget to set your access token here!
        //     // See https://unsplash.com/developers
        //     accessKey: 'key'
        // });

        // const arr: record[] = []
        // api.search
        // .getPhotos({ 
        //     query: query, 
        //     orientation: "landscape",
        //     page: 1,
        //     perPage: 9
        // })
        // .then(result => {
        //     result.response?.results.forEach( (item: itemData) => {
        //         arr.push({
        //             id: item.id,
        //             description: item.description,
        //             thumbImgUrl: item.urls.thumb,
        //             regularImgUrl: item.urls.regular
        //         })
        //     })
        //     setData(arr)
        //     setDataset(arr)
        // })
        // .catch(() => {
        //     console.log("something went wrong!");
        // });

        // const arr: record[] = []
        const res = await axios.get(`http://localhost:8000/?page=${page}&query=${query}`)
     
        setData(res.data)
        setDataset(res.data)
        setIsLoading(false)
    }, [page, query])

    useEffect(() => {
        if (query.length) {
            fetchData();  
        }
    }, [query, page, fetchData])

    // interface itemData {
    //     id: string, 
    //     description: string|null, 
    //     urls: {
    //         regular:string, 
    //         thumb:string
    //     }
    // }

    

    const search = (query: string) => {
        setQurery(query)
    }

    const nextPage = () => {
        setPage(prev => prev+1)
    }
    
    const prevPage = () => {
        page > 1 && setPage(prev => prev-1)
    }

    const openDetail = (item: record) => {
        setSelectedItem(item)
    }

    const closeDetail = () => {
        setSelectedItem(null)
    }

    return <SearchContext.Provider value={{
        dataset,
        page,
        query,
        search,
        nextPage,
        prevPage,
        openDetail,
        closeDetail,
        selectedItem
    }}>
        {children}
    </SearchContext.Provider>
}

export const useSearchContext = () => {
    const search = useContext(SearchContext)

    if (!search) {
        throw Error("Cannot use `useSearchContext` outside of `SearchProvider`")
    }

    return search
}

export default SearchProvider