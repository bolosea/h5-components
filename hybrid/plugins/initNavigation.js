export let setNavigation = (title,className,func,param,cbClassName,cbFunc,rightBtn,hiddenNavigation,showBack)=>{
    /**
     * @param title 导航栏标题 string
     * @param className 调起模块的名称 string
     * @param func 调起模块执行的方法 string
     * @param param 传给app的参数 any
     * @param cbClassName 回调模块的名称 string
     * @param cbFunc 回调方法 string
     * @param rightBtn 导航右侧按钮 array
     * @param hiddenNavigation 是否隐藏导航 bool
     * @param showBack 是否显示返回按钮 bool
     */
    var navParam = {
        hiddenNavigation:hiddenNavigation,                      // 隐藏app导航
        title:title,                                            // 标题
        showBack:showBack,                                      // 显示返回按钮
        backCallback:{                                          // 返回按钮的返回方法
            className:className,
            func:func,
            param:param
        },
        rightButtons:rightBtn                                   // 右边按钮方法
    }
        setTimeout(function(){

            postToApp('Navigation','initNavigation',navParam,'','')
        },300)
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
        console.log(getCookie('token'),'token=')
        postToApp('Console','log',{
            token:getCookie('token'),
            firstRequest:getCookie('firstRequest'),
            url:location.href
        },'','')
}
global.InitNav = {
    backToPrevPage: function(e){
        
        goBack2()

    },
    backToApp: function(){
        postToApp('Navigation','backToApp',{},'','')
    }
}

function goBack2(){
   
    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){ // IE
        if(history.length > 0){
            window.history.back( -1 );
        }else{
            postToApp('Navigation','backToApp',{},'','')
        }
    }else{ //非IE浏览器
        if (navigator.userAgent.indexOf('Firefox') >= 0 ||
            navigator.userAgent.indexOf('Opera') >= 0 ||
            navigator.userAgent.indexOf('Safari') >= 0 ||
            navigator.userAgent.indexOf('Chrome') >= 0 ||
            navigator.userAgent.indexOf('WebKit') >= 0){
 
            if(window.history.length > 1){
                let url = localStorage.getItem('firstUri')
                if(url === location.href){
                   postToApp('Navigation','backToApp',{},'','')

                }else{
                    // setTimeout(function(){
                    //     postToApp('Console','log',{
                    //         url: url,
                    //         href: location.href
                    //     },'','')
                    // },1000)
                    window.history.back( -1 );
                }
            }else{
                postToApp('Navigation','backToApp',{},'','')
            }
        }else{ //未知的浏览器
            postToApp('Navigation','backToApp',{},'','')
        }
    }
}