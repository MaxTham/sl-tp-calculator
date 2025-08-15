import { Stack } from "expo-router";
import {GlobalStyles} from "../styles/global";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: GlobalStyles.container,
      }}
    />
  );
}
