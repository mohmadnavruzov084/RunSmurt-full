const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const BrowserSync = require("browser-sync").create();
const { Version } = require("sass");
const clean = require("gulp-clean");

async function styles() {
  const autoprefixer = (await import("gulp-autoprefixer")).default;

  return src("app/sass/**/*.+(scss|sass)")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version "] }))
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(dest("app/css"))
    .pipe(BrowserSync.stream());
}

function scripts() {
  return src(["app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(BrowserSync.stream());
}

function watching() {
  watch(["app/sass/**/*.+(scss|sass)"], styles);
  watch(["app/js/main.js"], scripts);
  watch(["app/*.html"]).on("change", BrowserSync.reload);
}

function browserSync() {
  BrowserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(["app/css/style.min.css", "app/js/main.min.js", "app/**/*.html"], {
    base: "app",
  }).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browserSync = browserSync;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, browserSync, watching);
