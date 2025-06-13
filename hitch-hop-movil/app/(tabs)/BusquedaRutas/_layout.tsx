import { Stack } from "expo-router";
import SearchContext from "@/components/shared/SearchContext";

export default function Layout() {
    return (
        <SearchContext>
            <Stack screenOptions={{headerShown: false}} initialRouteName="busquedaMain"/>
        </SearchContext>
    )
}