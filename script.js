
/*pageChanger é usado para determinar
qual a página para o qual devemos transitar*/
var PageHandler = function(){
    var currentPage = "#page1";
    this.getCurrentPage = function(){
        return currentPage;
    };
    this.getNextPage = function(){
        return updatePage();
    };
    var updatePage = function(){
        if (currentPage == "#page1"){
            currentPage = "#page2";
        } else {
            currentPage = "#page1";
        }

        return currentPage;
    };
};

var pageChanger = new PageHandler();

var myRoutes = [
    { "#x":      { handler: function(){ console.log("x router");}, events: "bC", argsre: true  }},
    { "#page":      { handler: "pageBc", events: "bC", argsre: true }},
    //views will be toggled between this 2 pages
    { "#page1":      { handler: "dynamicView", events: "bC", argsre: true }},
    { "#page2":      { handler: "dynamicView", events: "bC", argsre: true }}
];


var myHandlers = {
    pageBc: function(type,match,ui,page,e){
        console.log("#page router")
        e.preventDefault();
        ui.toPage = pageChanger.getNextPage();
        console.log("redirected to view" + ui.toPage);
        ui.bCDeferred.resolve();
    },
    dynamicView: function(type,match,ui,page,e){
        console.log(pageChanger.getCurrentPage() + " router")
        e.preventDefault();
        console.log(ui.options.dataUrl);
        var params = approuter.getParams( ui.options.dataUrl);


        var p = params.id;
        console.log(p);
        switch (p)
        {
            case "dogs":
                console.log("rendering dogs in 1000 seconds");
                setTimeout(function(){
                    $( pageChanger.getCurrentPage() + " .content").html("Dogs at " + pageChanger.getCurrentPage());
                    ui.bCDeferred.resolve();
                },1000);
                break;
             case "cats":
                console.log("rendering cats in 4000 seconds");
                setTimeout(function(){
                    $( pageChanger.getCurrentPage() + " .content").html("cats at " + pageChanger.getCurrentPage());
                    ui.bCDeferred.resolve();
                },4000);
                break;
            case "profile":
                console.log("rendering profile in 1000 seconds");
                setTimeout(function(){
                    $( pageChanger.getCurrentPage() + " .content").html("profile at " + pageChanger.getCurrentPage());
                    ui.bCDeferred.resolve();
                },1000);
                break;
        }
    }
};

var approuter = new $.mobile.Router(myRoutes, myHandlers, {
          // defaultHandler: function(type, ui, page) {
          //   console.log("Default handler called due to unknown route ("+ type + ", " + ui + ", " + page + ")"
          //   );
          // },
          defaultHandlerEvents: "s",
          defaultArgsRe: true
        });