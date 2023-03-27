#Makefile

setup:
	install link

install: # install deps
	npm ci

link:
	npm link

publish: # publish the project locally
	npm publish --dry-run

lint: # linter check
	npx eslint .

fix: # linter fix
	npx eslint --fix .

test: # start test
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
