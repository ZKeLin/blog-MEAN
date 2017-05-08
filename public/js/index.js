"use strict";

/**
*  Module web bolg
*  author kelin
* Description
*/
angular.module('web', ['ui.router','ngCookies']);
angular.module('web')
	.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
		// $stateProvider.state('main',{
		// 	url: '/mian',
		// 	templateUrl: 'view/main.html',
		// 	controller: 'mainCtrl'
		// }).state('login',{
		// 	url: '/login',
		// 	templateUrl: 'view/login.html',
		// 	controller: 'loginCtrl'
		// })
		// $urlRouterProvider.otherwise('mian');
		// console.log($stateProvider);
	}]);
angular.module('web')
	.factory('cache', [function(){
		return {
			get: function(key){
				return window.localStorage[key];
			},
			set: function(key,value){
				window.localStorage[key] = value;
			},
			removeAll: function(){
				window.localStorage.clear();
			}
		}
	}]);
angular.module('web')
	.controller('blogContentCtrl', ['$scope','$http', function($scope,$http){
		$scope.name = "kelin";
		var array = [];
		$http({ method: 'get',url: '/blogList' }).then(function(res){
			var blogLists = res.data;
			for(var i = 0; i<blogLists.length; i++){
				var obj = {};
				obj.id = blogLists[i]._id;
				obj.title = blogLists[i].title;
				obj.date = blogLists[i].date.slice(0,10);
				array.push(obj);
			}
		});
		$scope.titleLists = array;
		$scope.$on('blogList',function(event,data){
			$scope.$broadcast('blog',data);
			//console.log("broadcast",$scope.$broadcast('blog',data));
		});
	}]);
angular.module('web')
	.controller('loginCtrl', ['', function(){
		
	}]);
angular.module('web')
	.controller('mainCtrl', ['$scope', function($scope){
		
	}]);
angular.module('web')
	.controller('blogListCtrl',['$scope','$http','cache',function($scope,$http,cache){
		function transform(data,page){
			var blogArray = data;
			var array = [];
			var page = page || 1;
			for(var i = 0; i<blogArray.length;i++){
				var obj = {};
				obj.num = 10*(page-1)+1+i;
				obj.id = blogArray[i]._id;
				obj.title = blogArray[i].title;
				obj.author = blogArray[i].author;
				obj.date = blogArray[i].date.slice(0,10);
				obj.content = blogArray[i].content;
				obj.zanNum = blogArray[i].zanNum;
				array.push(obj);
			}
			return array;
		}
		$http({method:'get',url: '/tabPage?page=1'}).then(function(res){
			$scope.blogLists = transform(res.data);
		},function(err){
			throw err;
		});
		$scope.$on('blog',function(event,data){
			$scope.$on('page',function(evevt,page){
				$scope.blogLists = transform(data,page);
			});
		});
		//显示点击的blog内容
		$scope.showBlog = function(blog){
			$scope.$broadcast('showblog',blog);
		}
		//删除blog	
		$scope.deleteBlog = function(id){
			console.log(id);
			var ensure = confirm("确定要删除？");
			if(ensure){
				$http({method: 'get',url: '/delete?id='+id}).then(function(res){
					console.log(res.data);
					if(res.data){
						console.log(res.data);
						alert("删除成功");
						$scope.blogLists = transform(res.data);
					}
				},function(err){
					throw err;
				});
			}else{

			}
		};
		$scope.modify = function(id){
			$http({method: 'get',url: '/blogOne?id='+id}).then(function(res){
					//console.log(res.data);
					if(res.data){
						angular.forEach(res.data,function(value,key){
							//console.log('key',key);
							cache.set(key,value);
						});
						$scope.$broadcast('modify',true);
						//console.log(cache.getBlog());
						window.location = '/managemsg';
					}
				},function(err){
					throw err;
				});
		};
		$http({method: 'get',url: '/pageNum'}).then(function(res){
			var num = Math.ceil(res.data/10);
			var array = [];
			for(var i=1;i<=num;i++){
				array.push(i);
			}
			$scope.pageNum = array;
		});
	}]);
angular.module('web')
	.directive('blogDialog',[function(){
		return {
			restrict: "A",
			replace: true,
			templateUrl: '/template/blogdialog.ejs',
			link: function($scope,element){
				$scope.close = function(){
					element[0].parentNode.style = "display:none";
				}
				$scope.$on('showblog',function(event,data){
					if(data){
						element[0].parentNode.style = "display:block";
						data.content = data.content.split(/\n.\n{0,}/);
						$scope.blog = data;
					}
				});
			}
		}
	}]);
angular.module('web')
	.directive('blogContent',['$http','$timeout','$cookies',function($http,$timeout,$cookies){
		return {
			restrict: "A",
			replace: true,
			scope: true,
			templateUrl: '/template/blogcontent.ejs',
			link: function($scope,element){
				$http.get('/blogList').then(function(res){
					res.data[0].content = res.data[0].content.split(/\n.\n{0,}/);
					$scope.blog = res.data[0];
					console.log($scope.blog);
				});
				$scope.$on('blog',function(event,data){
					console.log('data',data);
					data.content = data.content.split(/\n.\n{0,}/);
					$scope.blog = data;
					$scope.zanNum = data.zanNum;
					console.log($scope.blog);
				});
				//点赞功能
				$scope.toggleZan = function(num,id){
					$scope.num = {};
					var className = element.find('i')[0].className;
					if(className.indexOf('activeIcon') < 0){
						element.find('i')[0].className = 'zanIcon activeIcon';
						$scope.num[id] = num + 1;
					}else{
						element.find('i')[0].className = 'zanIcon';
						$scope.num[id] = num;
					}
					$http({method: 'get',url:'/addZan?id='+id+'&zanNum='+$scope.num[id]}).then(function(res){
						console.log('1res',res.data);
					},function(err){
						console.log(err);
					});
				}
				//评论功能（预留）
				$scope.review = function(){

				}
				
			}
		}
	}]);
angular.module("web")
	.directive("blogManage",['$http','$timeout','cache',function($http,$timeout,cache){
		return {
			restrict: "A",
			replace: true,
			templateUrl: "/template/blogmanage.ejs",
			link: function($scope,element){
				$scope.title = cache.get('title');
				$scope.author = cache.get('author');
				$scope.content = cache.get('content');
				$scope.id = cache.get('_id');
				//1s后清除所有localStorge
				$timeout(function(){cache.removeAll()},1000);
				$scope.isModify = false;
				$scope.$on('modify',function(event,data){
					console.log(data);
					$scope.isModify = data;
					//console.log(element.find('[disabled="disabled"]'));
				});
				$scope.modify = function (id) {
					var obj = {
						title: $scope.title,
						author: $scope.author,
						content: $scope.content
					};
					console.log(obj);
					$http({method:'POST',url: '/modify?id='+$scope.id,data: obj}).then(function(res){
						console.log(res.data);
						if(res.data == '修改成功'){
							alert("修改成功");
							window.location = '/admin';
						}
					});
				};
			}
		}
	}]);
angular.module('web')
	.directive('contentHeader',[function(){
		return {
			rextrict: "A",
			replace: true,
			scope: {
				logoName: '@',
				srcPath: '@'
			},
			templateUrl: '/template/contentheader.ejs'
		}
	}]);
angular.module('web')
	.directive('listBox',['$http',function($http){
		return {
			restrict: 'A',
			replace: true,
			scope: {
				lists: '='//名字不要跟控制器里的名字一样，不知道为么，一个小坑吧
			},
			templateUrl: '/template/listbox.ejs',
			link: function($scope){
				//console.log($scope.name);
				//console.log($scope.lists);
				$scope.selectList = function(id){
					console.log(id);
					$http({method: 'GET',url: '/blogOne?id='+id}).then(function(res){
						$scope.$emit('blogList',res.data);
						console.log("emit",res.data);
					});
					// var blogList = $scope.select(id);
					// console.log(blogList);
					// $scope.$emit('blogList',"jdfkfalsk");
					document.getElementsByClassName('zanIcon')[0].className = 
						document.getElementsByClassName('zanIcon')[0].className.replace('activeIcon','');
				}
			}
		}
	}]);
angular.module('web')
	.directive('loginBox',['$http','$location',function($http,$location){
		return {
			restrict: 'A',
			templateUrl: '/template/loginbox.ejs',
			replace: true,
			controller: '',
			link: function($scope){
				var exist = false;
				$scope.errNhint = " ";
				$scope.errPhint = " ";
				$scope.validateName = function(){
					var obj = {
						managerName: $scope.managerName
					}
					console.log($scope.managerName);
					if(!$scope.managerName) {
						$scope.errNhint = "用户名不能为空";
					}else{
						$http({method:'POST',url:'/manlogin',data:obj}).then(function(res){
							console.log(res.data);console.log('aaa');
							if(res.data === '用户名不存在'){
								$scope.errNhint = '用户不存在';
							}else{
								$scope.errNhint = '';
								exist = true;
							}
						},function(err){
							console.log('bb');
						});
					}
				}
				$scope.validatePassword = function(){
					console.log(exist);
					var obj = {
						managerName:$scope.managerName,
						password: $scope.password
					}
					if(!$scope.password) {
						$scope.errPhint = "用户密码不能为空";
					}else{
						if(exist){
							$http({method:'POST',url:'/manlogin',data: obj}).then(function(res){
								//判断res返回的是不是res.redirect()的内容 如果是则成功
								//当点击确定按钮时，将会重定向的res.redirect()的页面（/admin）
								if(/^<!DOCTYPE html>/.test(res.data)){
									$scope.errPhint = '';
								}else{
									$scope.errPhint = '密码错误';
								}
							})
						}else{
							$scope.errPhint = "输入正确的用户名";
						}
					}
					
				}
			}
		}
	}]);
angular.module('web')
	.directive("page",['$http',function($http){
		return {
			restrict: 'A',
			replace: true,
			scope:{
				apage: '='
			},
			templateUrl: '/template/page.ejs',
			link: function($scope,element,attrs){
				$scope.tabPage = function(page){
					$http({method:'get',url:'/tabPage?page='+page}).then(function(res){
						console.log(res.data);
						$scope.$emit('blog',res.data);
						$scope.$emit('page',page);
					});
				}
				$scope.prePage = function(){
					
				};
			}
		}
	}]);
angular.module('web')
	.directive('webHeader',[function(){
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/template/webheader.ejs',
			controller: ''
		}
	}]);