var db = require('./db');
db.connect('localhost', 'packlista', 'tmppass', 'packlista');

exports.addCategory = function(name, callback){
	db.query("INSERT INTO categories (id, name) VALUES (NULL, ?)", [name], callback);
};

exports.addItem = function(categoryId, name, callback){
	db.query("INSERT INTO items (id, categoryId, name, done) VALUES (NULL, ?, ?, 0)", [categoryId, name], callback);
};

exports.setState = function(itemId, state, callback){
	db.query("UPDATE items SET done = ? WHERE id = ?", [state, itemId], function(result){
		if(result.affectedRows){
			callback({error:false});
		}else{
			callback({error: true, msg: "Could not find the requested item"});
		}
	});
};

exports.toggleItem = function(itemId, callback){
	db.query("UPDATE items SET done = IF(done=0, 1, 0) WHERE id = ?", [itemId], function(result){
		if(result.affectedRows){
			callback({error:false});
		}else{
			callback({error: true, msg: "Could not find the requested item"});
		}
	});
};

exports.getListData = function(callback){
	db.query("SELECT id, name FROM categories", [], function(results){
		appendItems(results, [], callback);
	});
};

function appendItems(categories, data, callback){
	if(categories.length > 0){
		db.query("SELECT id, name, done FROM items WHERE categoryId = ?", [categories[0].id], function(itemResults){
			data.push({id: categories[0].id, name: categories[0].name, items: itemResults});
			appendItems(categories.splice(1), data, callback);
		});
	}else{
		callback(data);
	}
}