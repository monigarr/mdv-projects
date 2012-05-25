//tutorial:  http://custardbelly.com/blog/2011/01/04/jquery-mobile-couchdb-part-4-editing-documents/

var ProjectPageController = function() {
 
    function handleView()
    {
        $("#editbutton").live("click", handleEdit);
 
        // Watch for bound hide of page to clear from cache.
        var docId = $("#projectcontent").data("identity");
        var projectPage = $(document.getElementById("_show/project/" + docId));
        projectPage.bind( "pagehide", handlePageViewHide );
    }
 
    function handleEdit( event )
    {
        // Prevent default link event.
        event.preventDefault();
        // Access document id from data-identity.
        var docId = $("#projectcontent").data("identity");
        // Change page.
        $.mobile.changePage( "_show/project-edit/" + docId, "slide", false, true );
        return false;
    }
 
    function handlePageViewHide()
    {
        $("#editbutton").die( "click", handleEdit );
 
        var docId = $("#projectcontent").data("identity");
        var projectPageCache =  $(document.getElementById("_show/project/" + docId));
        projectPageCache.unbind( "pagehide", handlePageViewHide );
        projectPageCache.empty();
        projectPageCache.remove();
    }
 
    return {
        initialize : function() {
            $("div[data-role='page']").live( "pageshow", function() {
                $("div[data-role='page']").die( "pageshow" );
                handleView();
            });
        }
    };
}();
 
function handlePageViewReady()
{
    ProjectPageController.initialize();
}
$().ready( handlePageViewReady );