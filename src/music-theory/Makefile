build:
  # Home page build
	jspm bundle-sfx --minify lib/main dist/app.min.js
	./node_modules/.bin/html-dist index.html --remove-all --minify --insert app.min.js -o dist/index.html
	cp -f dist/app.min.js ../../public/js/music-theory/app.min.js
