//=======================================================================
//=	takumiPadWindowSize.js								2022/03/15      =
//=	匠PAD                                                               =
//=======================================================================
takumiPadWindowSize = new function()
{
	//===================================================================
	//=	windowResize処理												=
	//===================================================================
	this.setWindowResize = function()
	{
        $(window).resize(function(){
            var windowWidth = $(".snc_maincontent_area").width();
            if (windowWidth > 1000)
            {
                $(".snc_treeview_area").show();
            }else{
                $(".snc_treeview_area").hide(); 
            }
        });
	}
}