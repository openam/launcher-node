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
				if (doc) {
					bookmarks[count] = doc;
					count++;
				}
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

		if (req.body.bookmark.link.length == 0) {
			db.rm(entry.title, function(){
				res.send('add', {remove : entry.title})
			})
		} else {
			db.set(entry.title, entry, function(){
				res.send('add', entry);
			});
		}
	});

	/**
	 * Delete
	 *
	 * todo: need to make this so that it just returns what title needs to be deleted instead of redirecting.
	 */
	app.del('/bookmarks/:title', function(req, res){
		var title = req.params.title;

		db.rm(title, function(){
			res.redirect('/bookmarks');
		})
	});
}