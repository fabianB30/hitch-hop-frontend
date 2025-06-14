import React from 'react'
import { createContext, useContext, useState, ReactNode } from 'react'

type SearchFormType = {
  date: Date
  setDate: React.Dispatch<React.SetStateAction<Date>>
  destination: string
  setDestination: React.Dispatch<React.SetStateAction<string>>
}

type ChildrenType = {
    children: ReactNode
}

const SearchForm = createContext<SearchFormType | undefined>(undefined)

const SearchContext = ({ children }: ChildrenType) => {
    const [date, setDate] = useState(new Date())
    const [destination, setDestination] = useState<string>("");

  return (
    <SearchForm.Provider value={{date, setDate, destination, setDestination}}>
        {children}
    </SearchForm.Provider>
  )
}

export function useForm() {
    const context = useContext(SearchForm)
    if (!context) {
        throw new Error("useForm must be used within a SearchContext provider")
    }
    return context
}

export default SearchContext