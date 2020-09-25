

const { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(), // Узнать можно на этом сайте https://drupal-coder.ru/blog/drupal-browser-sync
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	group_media = require('gulp-group-css-media-queries'), // Группирует все медия вниз
	clean_css = require('gulp-clean-css'), // Минификатор css
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default, // Минификатор js
	imagemin = require('gulp-imagemin'), // Минификатор js
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webpcss'),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	fs = require('fs');


// Переменные папок файлов
const PROJECT_FOLDER = "dist";
const SOURCE_FOLDER = "#src";

// Объекты, который содержит свойтсва, которые содержат объекты с путями к файлам и папкам
let path = {
	// В этом свойстве хранится пути, куда gulp будет выгружать обработанные файлы
	build: {
		html: `${PROJECT_FOLDER}/`,
		css: `${PROJECT_FOLDER}/css/`,
		js: `${PROJECT_FOLDER}/js/`,
		img: `${PROJECT_FOLDER}/img/`,
		fonts: `${PROJECT_FOLDER}/fonts/`,
	},
	// Тут хранятся исходники
	src: {
		html: [`${SOURCE_FOLDER}/*.html`, `!${SOURCE_FOLDER}/_*.html`],
		css: `${SOURCE_FOLDER}/scss/style.scss`,
		js: `${SOURCE_FOLDER}/js/script.js`,
		img: `${SOURCE_FOLDER}/img/**/*.{jpg,png,svg,gif,ico,webp}`, //! конкрутезирую файлы с помощью *
		fonts: `${SOURCE_FOLDER}/fonts/*.ttf`,
	},
	// Пути к файлам которых надо прослушивать постоянно (отлавливать изменение)
	watch: {
		html: `${SOURCE_FOLDER}/**/*.html`,
		css: `${SOURCE_FOLDER}/scss/**/*.scss`,
		js: `${SOURCE_FOLDER}/js/**/*.js`,
		img: `${SOURCE_FOLDER}/img/**/*.{jpg,png,svg,gif,ico,webp}`, //! конкрутезирую файлы с помощью *
	},
	// Путь к папке проекта чтобы его удалять когда мы запускаем gulp
	clean: `./${PROJECT_FOLDER}/`,
}




// Функция сниузу создает live server
function browserSync() {
	browsersync.init({
		server: {
			baseDir: `./${PROJECT_FOLDER}/`
		},
		port: 3000,
		notify: false // Убирает увидомление о том что браузер обновился
	})
}

// Обрабатываем файлы html
function html() {
	return src(path.src.html)
		.pipe(fileinclude())					// https://www.npmjs.com/package/gulp-file-include
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

// Обрабатываем файлы css
function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(group_media())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)
		.pipe(webpcss())
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

gulp.task('otf2ttf', function () {
	return src([`${SOURCE_FOLDER}/fonts/*.otf`])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(`${SOURCE_FOLDER}/fonts/`));
})

gulp.task('svgSprite', function () {
	return gulp.src([`${SOURCE_FOLDER}/iconsprite/*.svg`])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../icons/icons.svg',
				}
			},
		}
		))
		.pipe(dest(path.build.img))
});

function fontsStyle() {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', callBack);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function callBack() {

}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

function clean() {
	return del(path.clean);
}

// В переменной build находятся функций которые должны выполнятся
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;


