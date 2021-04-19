run: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ REACT_APP_JOBS_ENABLED=true yarn start 
run.local: 
	REACT_APP_NOT_SECRET_CODE=http://localhost:3000/ REACT_APP_JOBS_ENABLED=true yarn start 
run.local.va: 
	REACT_APP_NOT_SECRET_CODE=http://localhost:3000/ REACT_APP_VA_ENABLED=true REACT_APP_JOBS_ENABLED=true yarn start 
clean: 
	rm -rf node_modules/
	yarn cache clean 
	yarn install 
deploy: 
	REACT_APP_NOT_SECRET_CODE=https://api.yourjha.com/ yarn build 
	firebase deploy
