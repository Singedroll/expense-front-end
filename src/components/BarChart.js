import { useThemecontext } from "@/providers/Themecontext";

export const BarChart = () => {
  const { records } = useThemecontext();
  console.log(records);
};
