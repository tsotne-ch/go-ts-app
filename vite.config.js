import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: [resolve(__dirname, "resources/js/app.ts")],
            formats: ["es"],
            name: "[name]",
            fileName: "[name]",
        },
        outDir: "static",
        emptyOutDir: false,
    },
});