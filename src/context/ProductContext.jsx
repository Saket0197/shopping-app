import { createContext,useState } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({children}) {

    const [categories,setCategories] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState('All');
    const [selectedFilters,setSelectedFilters] = useState({rating:'None',range:'None'});

    const value = {
        categories,setCategories,selectedCategory,setSelectedCategory,selectedFilters,setSelectedFilters
    }

return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}