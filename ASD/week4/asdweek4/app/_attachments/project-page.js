//tutorial:  http://custardbelly.com/blog/2011/01/04/jquery-mobile-couchdb-part-4-editing-documents/

var ProjectPageController = function() {

	/* RIPPED FROM jquerymobile-1.0a2.js */
	function getOffsetTop(ele)
	{
		var top = 0;
		if (ele)
		{
			var op = ele.offsetParent, body = document.body;
			top = ele.offsetTop;
			while (ele && ele != body)
			{
				top += ele.scrollTop || 0;
				if (ele == op)
				{
					top += op.offsetTop;
					op = ele.offsetParent;
				}
				ele = ele.parentNode;
			}
		}
		return top;
	}
	
	function setTop(el){
		var fromTop = $(window).scrollTop(),
			thisTop = getOffsetTop(el[0]), // el.offset().top returns the wrong value on iPad iOS 3.2.1, call our workaround instead.
			thisCSStop = el.css('top') == 'auto' ? 0 : parseFloat(el.css('top')),
			screenHeight = window.innerHeight,
			thisHeight = el.outerHeight(),
			useRelative = el.parents('.ui-page:not(.ui-page-fullscreen)').length,
			relval;
		if( el.is('.ui-header-fixed') ){
			relval = fromTop - thisTop + thisCSStop;
			if( relval < thisTop){ relval = 0; }
			return el.css('top', ( useRelative ) ? relval : fromTop);
		}
		else{
			//relval = -1 * (thisTop - (fromTop + screenHeight) + thisCSStop + thisHeight);
			//if( relval > thisTop ){ relval = 0; }
			relval = fromTop + screenHeight - thisHeight - (thisTop - thisCSStop);
			return el.css('top', ( useRelative ) ? relval : fromTop + screenHeight - thisHeight );
		}
	}
	/* END RIPPED FROM jquerymobile-1.0a2.js */
 
    function handleView()
    {
        setTop( $("#falseFooter") );
        $("#editbutton").live("click", handleEdit);
 		$("#deleteButton").live( "click", handleDelete );
 
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
    
	function handleDelete( event )
	{
		// Prevent default link event.
		event.preventDefault();
		// Access document id from data-identity.
		var docId = $("#projectcontent").data("identity");
		// Change page.
		$.mobile.changePage( "_show/project-delete/" + docId, "slideup", false, false );
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