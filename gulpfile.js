"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");                    //min.css
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var server = require("browser-sync").create();
var del = require("del");
var minify = require("gulp-minify");
var htmlmin = require("gulp-htmlmin");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss") //получаем необходимые файлы
    .pipe(plumber()) //обработчик ошибок в scss файлах
    .pipe(sourcemap.init())  //создается карта css
    .pipe(sass()) //из sass -> css
    .pipe(postcss([
      autoprefixer()  //добавление префиксов
    ]))
    .pipe(csso())                // минификация css
    .pipe(rename("style.min.css"))  //переименовывает файл
    .pipe(sourcemap.write(".")) //записывает в текущую папку карту css
    .pipe(gulp.dest("build/css")) //переносит файлы в другую папку
    .pipe(server.stream());
});

gulp.task("compress", function() {
  return gulp.src("source/js/script.js")
    .pipe(minify({
      ext:{
        min:".min.js"
      }
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task("server", function () {
  server.init({
    server: "build/", //папка для которой запускается сервер
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css")); // следит за изменениями файлов
  gulp.watch("source/img/sprites/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("compress", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({quality: 75, optimizationLevel: 5}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {  //конвертирует изображения в формат webp
  return gulp.src("source/img/**/*.{png, jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () { //делаем svg спрайты и удаляем мусор из svg
  return gulp.src("source/img/sprites/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include() //добавит в тег <include src=""></include> например спрайты
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    //"source/fonts/**/*.{woff2, woff}",
    "source/fonts/**",
    "source/img/**",
    "!source/img/sprites/**",
    "!source/img/preview/**",
    "source/js/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "compress", "html"));
gulp.task("start", gulp.series("build", "server"));
