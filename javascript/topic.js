topickCtrl = new function()
{
    this.loadTopicHtml = function() {
        
        // 物件管理
        $("document").ready(function(){
            $("#bukken-container").load("topic/bukken.html");
        });
        // fetch("../html/topic/bukken.html")
        //     .then(response => response.text())
        //     .then(data => {
        //         document.getElementById("bukken-container").innerHTML = data;
        //     });
      
        // バックアップ
        // $("document").ready(function(){
        //     $("#andes_backup-container").load("../html/topic/andes_backup.html");
        // });
    }
    
}
