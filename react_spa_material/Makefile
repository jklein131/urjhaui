run: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ yarn start 
run.local: 
	REACT_APP_NOT_SECRET_CODE=http://localhost:3000/ yarn start 
clean: 
	rm -rf node_modules/
	yarn cache clean 
	yarn install 
deploy: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ yarn build 
	firebase deploy
