import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import type { ReactNode } from "react";

import "@catylast/tokens/tokens.css";
import "@catylast/primitives/styles.css";
import "@catylast/dynamic-table/styles.css";
import "@catylast/rich-editor/styles.css";
import "@catylast/card/styles.css";

type ThemeMode = "light" | "dark" | "system";

function ThemeWrapper({
  themeMode,
  children,
}: {
  themeMode: ThemeMode;
  children: ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = () => {
        root.setAttribute("data-theme", mq.matches ? "dark" : "light");
      };
      apply();
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    root.setAttribute("data-theme", themeMode);
    return undefined;
  }, [themeMode]);

  return <>{children}</>;
}

const withTheme: Decorator = (Story, context) => {
  const themeMode = (context.globals.themeMode as ThemeMode | undefined) ?? "light";
  return (
    <ThemeWrapper themeMode={themeMode}>
      <Story />
    </ThemeWrapper>
  );
};

const preview: Preview = {
  globalTypes: {
    themeMode: {
      name: "Theme",
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "system", title: "System", icon: "browser" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    layout: "padded",
    docs: {
      source: { type: "code" },
    },
    options: {
      storySort: {
        order: [
          "Welcome",
          "Foundations",
          "Actions",
          "Forms",
          "Display",
          "Overlay",
          "Data",
        ],
      },
    },
  },
};

export default preview;
