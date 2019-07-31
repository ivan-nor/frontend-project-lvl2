install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
link:
	sudo npm link
test:
	npm test
test-coverage:
	npm test -- --coverage