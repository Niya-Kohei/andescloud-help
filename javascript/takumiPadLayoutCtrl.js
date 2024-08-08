//=======================================================================
//=	takumiPadLayoutCtrl.js								2022/02/18    　=
//=	匠PAD                                                    寺坂       =
//=======================================================================
takumiPadLayoutCtrl = new function()
{
	//===================================================================
	//=	初期化処理														=
	//===================================================================
	this.init = function()
	{
        getTitleArea();
        setClickEvent();
        setlinkClickEvent();
        setFileName();
    }

    //===================================================================
	//=	ヘルプ画面のタイトルエリアの高さを取得する                          =
	//===================================================================
    var getTitleArea = function()
	{
        var getTitleAreaHeight = $("div.page_title_area").height();
        $("div.text_area").css('padding-top',getTitleAreaHeight);
    }

    //===================================================================
	//=	各種ｸﾘｯｸ時のｲﾍﾞﾝﾄ処理											=
	//===================================================================
    var setClickEvent = function()
	{
        // 選択中のトピックに色を付ける
        $(".snc_treeview_area").off('click',"li a");
        $(".snc_treeview_area").on("click","li a",function(){

            $(".snc_treeview_area li.selected").removeClass("selected");
            $(this).parent().addClass("selected");

            // モバイル用　トピッククリックでトピックメニューエリアを閉じる
            if($("#spnavi").is(":visible")){
                if($(this).parent().hasClass("submenu")){
                    //alert("閉じる");
                }else{
                    $(".snc_treeview_area:not(:animated)").slideUp("slow");   
                    $("#drop_menu_close").hide();
                }
            }
        });

        // 親メニュー処理
        $('.snc_treeview_area').off('click','span');
        $('.snc_treeview_area').on('click','span',function() {
            // メニュー表示/非表示
            $(this).next('ul').slideToggle('fast');
        });
    
        // 子メニュー処理
        $('.snc_treeview_area').off('click','li');
        $('.snc_treeview_area').on('click','li',function(e) {
            // メニュー表示/非表示
            $(this).children('ul').slideToggle('fast');
            e.stopPropagation();
            if ($(this).hasClass('submenu')) {
                $(this).toggleClass('submenu_open'); 
            }
        });

        // モバイル用　ヘルプトピッククリックでトピックメニューエリア表示・非表示処理
        $("#spnavi,#drop_menu_icon,#drop_menu_text,#drop_menu_close").click(function(){
            if($(".snc_treeview_area").is(":hidden")){
                $(".snc_treeview_area:not(:animated)").slideDown("slow");
                $("#drop_menu_close").show();
            }else{
                $(".snc_treeview_area:not(:animated)").slideUp("slow"); 
                $("#drop_menu_close").hide();
            }
        });

	}

    //===================================================================
	//=	参照先の画面切替する処理						            	=
	//===================================================================
    var setlinkClickEvent = function()
    {     
        //　別ウィンドウで表示
        $('a.popup').click(function(){
   
            var windowWidth = $(window).width();
            var windowHeight = $(window).height() - 100;

            var screenSize = screen;
            var x = (screenSize.width - windowWidth) / 2;
            var y = (screenSize.height - windowHeight) / 2; 

            let option = 'width=' + windowWidth + ',height=' + windowHeight + ',left=' + x + ',top=' + y + ',scrollbars=yes,status=no,toolbar=no,location=no,menubar=no,directories=no,resizable=yes'
            //window.open(this.href,'mywindow', option);
            window.open(this.href, Math.random() + 'mywindow', option)

            return false;

        });

        //　画面内を切替
        $('a').click(function(){
            
            //クラス名有無で処理の分岐
            if($(this).hasClass('link')){
                //リンク先取得
                var Link                = $(this).attr("href"); 
                //先頭3文字を省く
                var Link2               = Link.slice( 3 );
                //#以降は使用しない
                var Link3               = Link2.split('#',1);
                var setlink             = "li a[href='" + Link3 + "']";

                //子iframe内から親へ
                var setIOyaarea         = $("div.snc_treeview_area");
                var setIframe           = $(setlink ,parent.document);   //該当する要素(li)
                var setTopicSetMenu1    = setIframe.closest('.topic_area');
                var setTopicSetMenu     = $(setTopicSetMenu1).attr("name");

                //リンク先を選択を解除
                setIframe.parentsUntil(setIOyaarea).find("li.selected").removeClass("selected");
                //リンク先を選択する
                setIframe.parent().addClass("selected");

                // リンク先までulを開く
                setIframe.parentsUntil( $("div[name='" + setTopicSetMenu + "']"), "li").parents('li').addClass('submenu_open');
                setIframe.parentsUntil( $("div[name='" + setTopicSetMenu + "']"), "li").parents('ul').css({"display":"block"});

                //選択された項目を上に表示させるためスクロールさせる
                setIframe.get(0).scrollIntoView(true)

                window.location.href = Link;

            } else {
                var Link    = $(this).attr("href"); 
                if(Link.indexOf("#") > -1){
                    //#が含まれる場合
                    var headerHight     = $("div.page_title_area").height();
                    var headerHight1    = headerHight + "px";
                    var headerHight2    = "-" + headerHight1;
                    $(Link).css({"padding-top":headerHight1,"margin-top":headerHight2});
                }else{
                    //#が含まれない場合
                }
            }
        });

    }


    //===================================================================
	//=	戻るで画面を前のページに戻した際、選択するページ項目も戻る処理        =
	//===================================================================
    var setFileName = function()
    { 
        //今開いているページのファイル名
        var url         = window.location;
        var path        = url.href.split('/');
        //#以降は使用しない
        //var path1               = path.split('#',1);
        var file_name1  = path.pop();
        //#以降は使用しない
        var file_name2  = file_name1.split('#',1);
        var file_name   = "html/" + file_name2;

        //現在
        var setlink             = "li a[href='" + file_name + "']";
        var setIframe           = $(setlink ,parent.document);   //該当する要素(li)
        var setTopicSetMenu1    = setIframe.closest('.topic_area');
        var setTopicSetMenu     = $(setTopicSetMenu1).attr("name");

        //子iframe内から親へ
        var setIOyaarea         = $("div.snc_treeview_area");
        var selectItem = setIframe.parentsUntil(setIOyaarea).find("li.selected").children('a').attr("href");

        if(file_name == selectItem){
            //同じ場合
        }else if(selectItem == undefined) {
            //最初のログイン画面
            //リンク先を選択を解除
            setIframe.parentsUntil(setIOyaarea).find("li.selected").removeClass("selected");
        }else{
            //異なる場合
            //リンク先を選択を解除
            setIframe.parentsUntil(setIOyaarea).find("li.selected").removeClass("selected");
            //リンク先を選択する
            setIframe.parent().addClass("selected");

            // リンク先までulを開く
            setIframe.parentsUntil( $("div[name='" + setTopicSetMenu + "']"), "li").parents('li').addClass('submenu_open');
            setIframe.parentsUntil( $("div[name='" + setTopicSetMenu + "']"), "li").parents('ul').css({"display":"block"});

            //選択された項目を上に表示させるためスクロールさせる
            setIframe.get(0).scrollIntoView(true)
        }

    }


}