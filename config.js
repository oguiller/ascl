module.exports = function(){
	console.log("Environment SET to: " + process.env.NODE_ENV)
    switch(process.env.NODE_ENV){
        case 'development':
            return {'database': 'mongodb://localhost/wind'};

        case 'production':
            return {'database': 'mongodb://heroku_6v8t7pqh:heroku_6v8t7pqh@ds047114.mongolab.com:47114/heroku_6v8t7pqh'};

        default:
            return {'database': 'mongodb://localhost/wind'};
    }
};