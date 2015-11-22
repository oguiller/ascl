DOCUMENTATION:
----------------

	sudo npm install apidoc -g

	apidoc -f server.js

This will creat a doc folder /doc with all the documentation.

HELPFUL QUERIES:
----------------

To import the quiz into your mongo DB use:

		mongoimport --db mydb --collection quiz --type json --file quiz.json --jsonArray

Test that it was imported:

	db.quiz.find({id:1}).pretty()

To get a report of the logins:

	db.loginlogs.find({"date" : { $gte : new ISODate("2015-07-12T00:00:00Z"), $lte: new ISODate("2015-08-16T00:00:00Z") }}).pretty();

	db.loginlogs.find({"day" : 16, month: 8}).pretty();

Get users that have already answered the quiz and are not admins:

	db.users.find({ quizResults: {$exists: true, $not: {$size: 0}}, admin:false}, {username:1, _id:0})

POSTMAN Collection:
-------------------

This is the URL to get the collection for the current API: https://www.getpostman.com/collections/a0632e0ab198820cab45
