const gulp = require("gulp");
const minify = require("gulp-minify");
const jsonminify = require("gulp-jsonminify");
const del = require("del");
const destDir = "dist/lipstick"
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
    .pipe(gulp.dest(destDir));
  gulp.src(["src/lipstick.json"]).pipe(jsonminify()).pipe(gulp.dest(destDir));
  cb();
});

gulp.task("copy-static", function (cb) {
  gulp.src("index.html").pipe(gulp.dest(destDir));
  cb();
});

exports.build = gulp.series("clean", gulp.parallel("minify", "copy-static"));
