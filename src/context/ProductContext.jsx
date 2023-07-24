import { createContext,useState } from "react";

export const ProductContext = createContext();

export default function ProductContextProvider({children}) {

    const [rating, setRating] = useState('None');
    const [priceRange,setRange] = useState('None');
    const [categories,setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const value = {
        rating,setRating,priceRange,setRange,categories,setCategories,selectedCategory, setSelectedCategory
    }

return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}