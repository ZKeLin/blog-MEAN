/*
*加密函数  算法是让每个字符的asc码加1
*pwd 要加密的字符串
*/
exports.encryption = function(pwd){
	var newPwd = '';
	for(var i = 0; i<pwd.length; i++){
		newPwd = newPwd + (pwd.charCodeAt(i)+1);
	}
	return newPwd;
}
