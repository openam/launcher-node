module.exports = function(app, db) {

	app.get('/', function(req, res){
		res.writeHead(302, { 'Location': '/bookmarks' });
		res.end();
	});

	app.get('/bookmarks', function(req, res){
		/**
		 * get each bookmark
		 *
		 * NOTE: This is a blocking function from Node-Dirty
		 */
			var bookmarks = []
			var count     = 0;
			db.forEach(function(key, doc) {
				// console.log('%s is %j', key, doc)
				// doc.title = key;
				bookmarks[count] = doc;
				count++;
			});

		res.render('bookmarks/index', {
			'title'    : 'Express',
			'bookmarks': bookmarks
		});
	});

	app.post('/bookmarks/add', function(req, res){

		var entry = {
			'title'  : req.body.bookmark.title,
			'link'   : req.body.bookmark.link,
			'created': Date.now()
		};

		db.set(req.body.bookmark.title, entry);
		res.send('add', entry);
	});
}