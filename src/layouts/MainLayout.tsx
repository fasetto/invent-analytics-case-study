import { tv } from "tailwind-variants";
import { Outlet } from "react-router-dom";

const styles = tv({
  slots: {
    base: [
      "text-foreground bg-background",
      "flex flex-col items-center",
      "overflow-auto [scrollbar-gutter:stable]",
      "pb-16",
    ],
    title: "text-4xl font-bold my-9",
  },
});

const { base, title } = styles();

export default function MainLayout() {
  return (
    <div className={base()}>
      <h1 className={title()}>The Movie Database</h1>

      <Outlet />
    </div>
  );
}
