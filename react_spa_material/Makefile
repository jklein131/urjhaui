run: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ npm start 
run.local: 
	REACT_APP_NOT_SECRET_CODE=http://localhost:3000/ npm start 
clean: 
	rm -rf node_modules/
	npm cache clean 
	npm install 
deploy: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ npm build 
	firebase deploy
