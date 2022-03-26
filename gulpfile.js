const gulp = require("gulp");
const minify = require("gulp-minify");
const jsonminify = require("gulp-jsonminify");
const del = require("del");

gulp.task("clean", function (cb) {
  (async () => {
    const deletedPaths = await del("dist/");
    cb();
  })();
});

gulp.task("minify", function (cb) {
  gulp
    .src("src/*.js")
    .pipe(
      minify({
        noSource: true,
      })
    )
    .pipe(gulp.dest("dist"));
  gulp.src(["src/lipstick.json"]).pipe(jsonminify()).pipe(gulp.dest("dist"));
  cb();
});

gulp.task("copy-static", function (cb) {
  gulp.src("lib/*.js").pipe(gulp.dest("dist/lib/"));
  gulp.src("index.html").pipe(gulp.dest("dist/"));
  cb();
});

exports.build = gulp.series("clean", gulp.parallel("minify", "copy-static"));
