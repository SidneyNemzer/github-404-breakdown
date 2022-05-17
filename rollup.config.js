import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "serve", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

const contentScriptConfig = {
  input: "src/content-script.ts",
  output: {
    sourcemap: false,
    format: "iife",
    file: "build/github-404-breakdown-content-script.js",
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),

    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    terser(),
  ],
};

const appConfig = {
  input: production ? "src/index.ts" : "src/index.dev.ts",
  output: {
    sourcemap: !production,
    format: "iife",
    file: production
      ? "build/github-404-breakdown.js"
      : "public/scripts/github-404-breakdown.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
        enableSourcemap: !production,
      },
    }),

    // This will be placed next to `output.file`
    css({ output: "github-404-breakdown.css" }),

    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    !production && serve(),
    !production && livereload("public"),

    production && terser(),
    production &&
      copy({
        targets: [
          { src: "./src/manifest.json", dest: "./build/" },
          { src: "./images/icon.png", dest: "./build/" },
        ],
      }),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [production && contentScriptConfig, appConfig].filter(Boolean);
